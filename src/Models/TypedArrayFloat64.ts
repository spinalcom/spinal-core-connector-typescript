import { TypedArray } from "./TypedArray";

export class TypedArrayFloat64 extends TypedArray<number>{
  constructor( size = [], data ){
    super(size, data);
  }

  base_type() {
    return Float64Array;
  }

  deep_copy(): any {
    return new TypedArrayFloat64(this._size, this._data);
  }
}