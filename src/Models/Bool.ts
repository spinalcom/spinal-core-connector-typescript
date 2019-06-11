import { FileSystem } from "../FileSystem/FileSystem";
import { Obj } from "./Obj";

export class Bool extends Obj<boolean> {

  constructor(data?) {
    super();
    this._data = false;
    if (data)
      this._set(data);
  }

  public toggle() : void {
    this.set(!this._data);
  }

  toBoolean() : boolean {
    return this._data;
  }

  deep_copy(): Bool {
    return new Bool(this._data);
  }

  _set( value: Bool | boolean | string) {
    let n;

    if (value instanceof Bool) {
      n = value.toBoolean();
    } else if (value == "false") {
      n = false;
    } else if (value == "true") {
      n = true;
    } else {
      n = Boolean(value);
    }

    if (this._data !== n) {
      this._data = n;
      return true;
    }

    return false;
  }

  _get_fs_data(out) : string{
    FileSystem.set_server_id_if_necessary(out, this);
    return out.mod += `C ${this._server_id} ${ Number( this._data ) } `
  }

}