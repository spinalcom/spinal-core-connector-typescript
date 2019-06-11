import { Model } from "./Model";
import { FileSystem } from "../FileSystem/FileSystem";

export class Obj<T> extends Model{
  public _data : T;
  constructor(data?){
    super();

    if (data) {
      this._set(data);
    }
  }

  toString() : string{
    return this._data.toString()
  }

  equals(obj: any): boolean {
     if (obj instanceof Obj){
       return this._data == obj._data;
     }
     return this._data == obj;
  }

  get(): T{
    return  this._data;
  }

  _get_fs_data(out) :string{
    FileSystem.set_server_id_if_necessary( out, this);
    return out.mod += `C ${this._server_id} ${this.toString()} `;
  }

  _set(value){
    if (this._data != value) {
      this._data = value;
      return true;
    }
    return  false;
  }

  _get_state(): string{
    console.warn("get_state deprecated");
     return this._data.toString();
  }

  _set_state(str: string, map: object) {
    this.set(str);
  }
}