/***
 * @property _cur_mid {number} current model id (used to create new ids)
 * @property _counter {number} nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
 * @property _modlist {number} changed models (current round)
 * @property _n_processes {number} new processes (that will need a first onchange call in "force" mode)
 * @property _cur_process_id {number} current process id (used to create new ids)
 * @property _timeout {number} timer used to create a new "round"
 * @property _force_m {number} if _force_m == true, every has_been_modified function will return true
 * @property _synchro {number} synchronizer (link to the server that will store files)
 *
 */
import { Model } from "./Models/Model";
import { Bool } from "./Models/Bool";
import { Obj } from "./Models/Obj";
import { Lst } from "./Models/Lst";
import { Val } from "./Models/Val";
import { Str } from "./Models/Str";

export class ModelProcessManager {
  public static _cur_mid: number = 0;
  public static _counter: number = 0;
  public static _modlist: object = {};
  public static _n_processes: object = {};
  public static _cur_process_id: number = 0;
  public static _timeout: any = undefined;
  public static _force_m: boolean = false;
  public static _synchro: any = undefined;

  public static new_from_state(str: string): any {
    const map: object = {};
    const lst: string[] = str.split("\n");
    const mid = lst.shift();
    for (let sub of lst) {
      if (sub.length) {
        const s = sub.split(" ");
        map[s[0]] = {
          type: s[1],
          data: s[2],
          buff: undefined
        }
      }
    }


    // fill / update this with data in map[ mid ]
    const __new__ = eval(`new ${map[mid].type};`);
    __new__._set_state(map[mid].data, map);
    return __new__;

  }


  public static load(filename: string, func): any {
    console.warn("Model Process Manager load deprecated");
    // @ts-ignore
    if (!ModelProcessManager.synchronizer) {
      // @ts-ignore
      ModelProcessManager._synchro = new Synchronizer();
    }
    ModelProcessManager._synchro.load(filename, func)
  }

  public static conv(model: any) : Model | Lst<any> | Str| Val |Bool| Obj<any>{
    if (model instanceof Model) {
      return model;
    }

    if (model instanceof Array) {
      return new Lst(model);
    }

    if (typeof model === "string") {
      return new Str(model);
    }

    if (typeof model === "number") {
      return new Val(model);
    }

    if (typeof model === "boolean") {
      return new Bool(model);
    }

    if (model instanceof Object) {
      return new Model(model);
    }

    return new Obj(model);
  }

  public static get_object_class(obj: object) {
    if (obj && obj.constructor && obj.constructor.name) {
      return obj.constructor.name;
    }
    if (obj && obj.constructor && obj.constructor.toString) {
      let arr;
      arr = obj.constructor.toString().match(/function\s*(\w+)/);
      if (!arr) {
        arr = obj.constructor.toString().match(/class\s*(\w+)/);
      }
      if (arr && arr.length === 2) {
        return arr[1];
      }
    }
  }

  public static _get_attribute_names(m: Model | object) {
    if (m instanceof Model) {
      return m._attribute_names;
    }
    return Object.keys(m);
  }

  public static _new_model_from_state(mid, map) {
    const info = map[mid];

    info.buff = eval(`new ${info.type};`);
    info.buff._set_state(info.data, map);
    return info.buff;
  }

  public static _need_sync_processes() {
    if (!ModelProcessManager._timeout)
      ModelProcessManager._timeout = setTimeout(ModelProcessManager._sync_processes, 1);

  }

  public static _sync_processes() {
    const processes = {};

    for (let key in ModelProcessManager._modlist) {
      if (ModelProcessManager._modlist.hasOwnProperty(key)) {
        const model: Model = ModelProcessManager._modlist[key];
        for (let process of model._processes) {
          processes[process.process_id] = {
            value: process,
            force: false
          }
        }
      }
    }

    for (let key in ModelProcessManager._n_processes) {
      if (ModelProcessManager._n_processes.hasOwnProperty(key)){
        processes[key] = {
          value: ModelProcessManager._n_processes[key],
          force: true
        }
      }
    }

    ModelProcessManager._timeout = undefined;
    ModelProcessManager._modlist = {};
    ModelProcessManager._n_processes = {};
    ModelProcessManager._counter += 2;

    for (let key in processes){
      if (processes.hasOwnProperty(key)){
        const process = processes[key];
        ModelProcessManager._force_m = process.force;
        process.value.onChange();
      }
    }

    ModelProcessManager._force_m = false;
  }

}