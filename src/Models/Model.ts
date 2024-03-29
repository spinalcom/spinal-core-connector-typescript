import { Process } from "../Processes/Process";
import { BindProcess } from "../Processes/BindProcess";
import { FileSystem } from "../FileSystem/FileSystem";
import {ModelProcessManager} from "../ModelProcessManager"


export interface BindCallBack {
  (): void
}

export class Model {

  public _attribute_names: string[] = [];
  public model_id: number;
  public _processes: Process[] = [];
  public _parents: any[] = [];
  public _date_last_modification: number;
  public _server_id: number;

  constructor(attr?: any) {
    this.model_id = ModelProcessManager._cur_mid++;
    if (attr) {
      this.set(attr);
    }
  }

  destructor() {

  }

  /**
   * return true if this (or a child of this) has changed since the previous synchronisation
   * @returns {boolean}
   */
  hasBeenModified(): boolean {
    //Todo Understand ModelProcessManager counter
    return this._date_last_modification > ModelProcessManager._counter - 2 || ModelProcessManager._force_m
  }


  /**
   * return true if this has changed since previous synchronisation due to a
   * direct modification (not from a child one)
   * @returns {boolean}
   */
  has_been_directly_modified(): boolean {
    return this._date_last_modification > ModelProcessManager._counter - 1 || ModelProcessManager._force_m
  }

  /**
   * if this has been modified during the preceding round, f will be called
   * @param f {Process| BindCallBack} If f is a process:
   * process.onchange will be called each time this (or a child of this) will
   * be modified.
   * process.destructor will be called if this is destroyed.
   * can be seen as a bind with an object
   *onchange_construction
   *
   * @param onChangeConstruction {boolean} true means that onchange will be automatically called after the bind
   */
  bind(f: Process | BindCallBack, onChangeConstruction: boolean = false) {
    if (f instanceof Process) {
      this._processes.push(f);
      f.models.push(this);

      if (onChangeConstruction) {
        ModelProcessManager._n_processes[f.process_id] = f;
        ModelProcessManager._need_sync_processes();
      }
    } else {
      new BindProcess(this, onChangeConstruction, f);
    }
  }

  /**
   *
   * @param f {Process | BindCallBack}
   */
  unbind(f: Process | BindCallBack): void {
    if (f instanceof Process) {
      this._processes.splice(this._processes.indexOf(f), 1);
      f.models.splice(f.models.indexOf(this), 1);
    } else
      for (let p of this._processes) {
        if (p instanceof BindProcess && p.func === f) {
          this.unbind(p);
        }
      }
  }

  /**
   * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
   * users are encouraged to use Models as much as possible
   * (meaning that get should not be called for every manipulation),
   * adding methods for manipulation of data if necessary
   * (e.g. toggle, find, ... in Lst, Str, ...).
   * May be redefined for specific types (e.g. Str, Lst, ...)
   */
  get(): any {
    const res = {};

    for (let name of this._attribute_names)
      res[name] = this[name].get();

    return res;
  }

  /**
   * modify data, using another values, or Model instances.
   * Should not be redefined (but _set should be)
   * returns true if object os modified
   * @param value
   */
  set(value: any): boolean {
    if (this._set(value)) {
      this._signal_change();
      return true;
    }
    return false;
  }

  /**
   * modify state according to str. str can be the result of a previous @get_state
   * @param str
   */
  set_state(str: string) {
    const map: object = {};
    const lst: string[] = str.split('\n');
    let mid = lst.shift();
    for (let i = 0; i < lst.length; i++) {
      const l = lst[i];
      if (!l.length) {
        continue;
      }

      let s = l.split(" ");
      map[s[0]] = {
        type: s[1],
        data: s[2],
        buff: void 0
      };
    }

    map[mid].buff = this;
    this._set_state(map[mid].data, map);
  }


  get_state(date: number = -1): string {
    let fmm: object = {};
    this._get_flat_model_map(fmm, date);

    let res = this.model_id.toString();

    if (this._date_last_modification > date) {
      for (let key in fmm) {
        if (fmm.hasOwnProperty(key)) {

          let obj: Model = fmm[key];
          res += "\n" + obj.model_id + " " + ModelProcessManager.get_object_class(obj) + " " + obj._get_state();
        }
      }
    }

    return res;
  }

  /**
   *
   * @param n {string | object} name of the attribute for p or a javascript
   * object
   * @param p
   * @param signalChange
   */
  add_attr(n, p?: Model | Function, signalChange: boolean = true): void {
    if (typeof p !== "undefined" && p !== null) {

      if (typeof p === "function") {
        this[n] = p;
      } else {

        if (this.hasOwnProperty(n))
          console.error(`attribute ${n} already exist in ` + `${ModelProcessManager.get_object_class(this)}`);

        // @ts-ignore
        p = ModelProcessManager.conv(p);

        if ((p instanceof Model) && p._parents.indexOf(this) === -1) {
          p._parents.push(this);
        }

        this._attribute_names.push(n);

        this[n] = p;

        if (signalChange)
          this._signal_change();

      }
    } else {
      for (const key in n) {
        if (n.hasOwnProperty(key)) {
          this.add_attr(key, n[key], signalChange);
        }
      }
    }

  }

  /**
   *
   * @param name {string} name of the attribute to remove
   * @param signalChange
   */
  rem_attr(name: string | number, signalChange = true): void {
    let c: Model = this[name];

    if (c) {
      let i = c._parents.indexOf(this);
      if (i >= 0) {
        c._parents.splice(i, 1);
        if (c._parents.length === 0) {
          c.destructor();
        }
      }
      delete this[name];
      i = this._attribute_names.indexOf(typeof name === "string" ? name : String(name));
      if (i >= 0)
        this._attribute_names.splice(i, 1);

      if (signalChange)
        this._signal_change();

    }
  }

  /**
   *
   * @param name {string} name of the attribute to change
   * @param value {Model | Function} value of the attribute
   */
  mod_attr(name: string | number, value: Model | Function): void {
    if (this[name] !== value) {
      this.rem_attr(name),
        this.add_attr(name, value);
    }
  }

  /**
   * add / mod/ rem attr to get the same data than o
   * @param o {object}
   */
  set_attr(o) {
    for (let key in o) {
      if (o.hasOwnProperty(key))
        this.mod_attr(key, o[key])
    }

    const to_rem = [];
    for (let name of this._attribute_names) {
      if (this._attribute_names.hasOwnProperty(name) && o.hasOwnProperty(name)) {
        to_rem.push(name);
      }
    }

    for (let key of to_rem) {
      this.rem_attr(key);
    }
  }

  /**
   * dimension of the object -> [] for a scalar, [ length ] for a vector,
   * [ nb_row, nb_cols ] for a matrix...
   * @param forDisplay {boolean}
   */
  size(forDisplay: boolean): [] {
    console.warn("function size is deprecated");
    return []
  }

  /**
   *
   * @param forDisplay
   */
  dim(forDisplay: boolean): number {
    console.warn("function dim is deprecated");
    return this.size(forDisplay).length;
  }

  equals(m: Model): boolean {
    if (this === m)
      return true;

    if (m.hasOwnProperty("_attribute_names")) {

      for (let key of m._attribute_names) {
        let val = m[key];
        if (!(this.hasOwnProperty(key)) || !this[key].equals(val))
          return false;
      }

      for (let name of this._attribute_names) {
        if (m._attribute_names.indexOf(name) === -1)
          return false;
      }

      return true;
    }

    return false;
  }

  get_parents_that_chekc(func_to_check: Function): any {
    let res = [];
    let visited = {};
    this._get_parents_that_check_rec(res, visited, func_to_check);
  }

  deep_copy(): any {
    var j, key, len, o, ref, __new__;
    o = {};
    ref = this._attribute_names;
    for (j = 0, len = ref.length; j < len; j++) {
      key = ref[j];
      o[key] = this[key].deep_copy();
    }
    eval(` __new__ = new ${ModelProcessManager.get_object_class(this)};`);
    __new__.set_attr(o);
    return __new__;
  }

  real_change() {
    if (this.has_been_directly_modified() && !this._attribute_names.length) {
      return true;
    }
    for (let name of this._attribute_names) {
      if (this.cosmetic_attribute(name))
        continue;
      if (this[name].real_change())
        return true;
    }
    return false;
  }

  cosmetic_attribute(name) {
    return false;
  }


  _get_state(): string {
    console.warn("_get_state deprecated");
    let str: string[] = [];
    for (let name of this._attribute_names) {
      str.push(name + ":" + this[name].model_id);
    }
    return str.join(",");
  }

  /**
   * Send data to server
   * @param out
   *
   */
  _get_fs_data(out) : string{
    FileSystem.set_server_id_if_necessary(out, this);
    const str = [];

    for (let i = 0; i < this._attribute_names.length; i++) {
      const attr = this._attribute_names[i];
      const obj = this[attr];
      FileSystem.set_server_id_if_necessary(out, obj);
      str.push(attr + ":" + obj._server_id)
    }
    return out.mod += `C ${this._server_id} ${str.join(",")} `;
  }

  _set(value : any): boolean {
    let change: boolean = false;
    let used = {};
    for (let key of ModelProcessManager._get_attribute_names(value)) {
      used[key] = true;
    }

    for (let key of this._attribute_names) {
      if (!used.hasOwnProperty(key))
        this.rem_attr(key);
    }

    for (let key in value) {
      if (value.hasOwnProperty(key) && value[key]) {

        if (this[key] && this[key].constructor === value[key].constructor)
          change = change ? change : this[key].set(value[key]);
        else {
          change = true;
          this.mod_attr(key, value[key]);
        }
      } else {
        this.add_attr(key, value[key], false)
      }
    }

    return change;
  }

  _signal_change(change_level: number = 2) {
    if (change_level === 2 && this._server_id) {
      FileSystem.signal_change(this);
    }
    ModelProcessManager._modlist[this.model_id] = this;

    if (this._date_last_modification < ModelProcessManager._counter) {
      this._date_last_modification = ModelProcessManager._counter + change_level;
      for (let parent of this._parents) {
        parent._signal_change(1)
      }
    }

    ModelProcessManager._need_sync_processes();
  }

  // generic definition of _set_state. ( called by _use_state )
  _set_state(str: string, map: object) {
    const u = {};

    if (str.length) {
      for (let spl of str.split(',')) {
        const inr = spl.split(':');
        let attr = inr[0];
        let k_id = inr[1];
        u[attr] = true;

        if (map[k_id].buff) {
          if (!this[attr]) {
            this.add_attr(attr, map[k_id].buff)
          } else if (map[k_id].buff !== this[attr]) {
            this.mod_attr(attr, map[k_id].buff);
          }
        } else if (!this[attr])
          this.add_attr(attr, ModelProcessManager._new_model_from_state(k_id, map));

        else if (!this[attr]._set_state_if_same_type(k_id, map))
          this.mod_attr(attr, ModelProcessManager._new_model_from_state(k_id, map));

      }
    }

    for (let name of this._attribute_names) {
      if (u.hasOwnProperty(name) && u[name])
        this.rem_attr(name)
    }
  }


  _get_parents_that_check_rec(res: Array<any>, visited: { [index: number]: boolean }, fun_to_check: Function) {
    if (!visited.hasOwnProperty(this.model_id)) {
      visited[this.model_id] = true;
      if (fun_to_check(this)) {
        res.push(this)
      } else
        for (let parent of this._parents) {
          parent._get_parents_that_chec_rec(res, visited, fun_to_check)
        }
    }
  }

  _set_state_if_same_type(mid, map) {
    let data = map[mid];
    if (ModelProcessManager.get_object_class(this) === data.type) {
      data.buff = this;
      this._set_state(data.data, map);
      return true;
    }
    return false;
  }

  _get_flat_model_map(map, date) {
    map[this.model_id] = this;

    for (let name of this._attribute_names) {
      const obj: Model = this[name];
      if (!map[obj.model_id]) {
        if (obj._date_last_modification > date)
          obj._get_flat_model_map(map, date)
      }
    }

  }
}