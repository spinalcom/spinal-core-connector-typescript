import { Obj } from "./Obj";

export class Val extends Obj<number> {
  public _data: number = 0;

  constructor(data?) {
    super();
    if (data)
      this.set(data)
  }

  toggle() {
    console.warn('toggle Val is deprecated',);
    this.set(!this._data);
  }

  toBoolean(): boolean {
    return Boolean(this._data);
  }

  deep_copy(): Val {
    return new Val(this._data);
  }

  add(value?: number) {
    if (value) {
      this._data += value;
      this._signal_change();
    }
  }

  _set(value): boolean {
    let n;
    if (typeof value == "string") {
      if (value.slice(0, 2) == '0x') {
        n = parseInt(value, 16);
      } else {
        n = parseFloat(value);
        if (isNaN(n)) {
          n = parseInt(value);
        }
        if (isNaN(n)) {
          console.log(`Don't know how to transform ${value} to a Val`);
        }
      }
    } else if (typeof value === "boolean")
      n = Number(value);
    else if (value instanceof Val)
      n = value._data;
    else
      n = value;
    if (this._data != n) {
      this._data = n;
      return true;
    }
    return false;
  }
}