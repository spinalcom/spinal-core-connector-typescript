import { Obj } from "./Obj";
import { FileSystem } from "../FileSystem/FileSystem";

export class Str extends Obj<string> {

  public _data: string = "";
  public length: number = 0;

  constructor(data?) {
    super();

    if (data)
      this._set(data);
  }

  toggle(str: string, space: string = " ") {
    const l = this._data.split(space);
    const i = l.indexOf(str);
    if (i < 0)
      l.push(str);
    else
      l.splice(i, 1);

    this.set(l.join(" "))
  }


  contains(str) {
    return this._data.indexOf(str) !== -1;
  }

  equals(str: string): boolean {
    return this._data === str.toString();
  }

  ends_with(str) {
    const l = this._data.match(str + "$");
    return typeof l !== "undefined" && l[0] === str;
  }

  deep_copy(): Str {
    return new Str(this._data);
  }

  _get_fs_data(out) {
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += `C ${this._server_id} ${encodeURI(this._data)} `
  }

  _set(value ?) : boolean{

    if (typeof value == "undefined"){
      return this._set("");
    }

    const n = value.toString();

    if (this._data !== n) {
      this._data = n;
      this.length = this._data.length;
      return true;
    }

    return false
  }

  _get_state(): string {
    return  encodeURI(this._data);
  }

  _set_state(str: string, map: object) :void {
    this.set(decodeURIComponent(str));
  }
}