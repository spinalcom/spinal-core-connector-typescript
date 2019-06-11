import { TypedArray } from "./TypedArray";

export class TypedArrayInt32 extends TypedArray<number>{
  constructor( size = [], data ){
    super(size, data);
  }

  base_type() {
    return Int32Array;
  }

  deep_copy(): any {
    return new TypedArrayInt32(this._size, this._data);
  }
}