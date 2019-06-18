"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var TypedArray_1 = require("./TypedArray");
var TypedArrayInt32 = /** @class */ (function (_super) {
    __extends(TypedArrayInt32, _super);
    function TypedArrayInt32(size, data) {
        if (size === void 0) { size = []; }
        return _super.call(this, size, data) || this;
    }
    TypedArrayInt32.prototype.base_type = function () {
        return Int32Array;
    };
    TypedArrayInt32.prototype.deep_copy = function () {
        return new TypedArrayInt32(this._size, this._data);
    };
    return TypedArrayInt32;
}(TypedArray_1.TypedArray));
exports.TypedArrayInt32 = TypedArrayInt32;
//# sourceMappingURL=TypedArrayInt32.js.map