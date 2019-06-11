"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TypedArray_1 = require("./TypedArray");
class TypedArrayInt32 extends TypedArray_1.TypedArray {
    constructor(size = [], data) {
        super(size, data);
    }
    base_type() {
        return Int32Array;
    }
    deep_copy() {
        return new TypedArrayInt32(this._size, this._data);
    }
}
exports.TypedArrayInt32 = TypedArrayInt32;
//# sourceMappingURL=TypedArrayInt32.js.map