"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypedArray_1 = require("./TypedArray");
class TypedArrayFloat64 extends TypedArray_1.TypedArray {
    constructor(size = [], data) {
        super(size, data);
    }
    base_type() {
        return Float64Array;
    }
    deep_copy() {
        return new TypedArrayFloat64(this._size, this._data);
    }
}
exports.TypedArrayFloat64 = TypedArrayFloat64;
//# sourceMappingURL=TypedArrayFloat64.js.map