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
var TypedArrayFloat64 = /** @class */ (function (_super) {
    __extends(TypedArrayFloat64, _super);
    function TypedArrayFloat64(size, data) {
        if (size === void 0) { size = []; }
        return _super.call(this, size, data) || this;
    }
    TypedArrayFloat64.prototype.base_type = function () {
        return Float64Array;
    };
    TypedArrayFloat64.prototype.deep_copy = function () {
        return new TypedArrayFloat64(this._size, this._data);
    };
    return TypedArrayFloat64;
}(TypedArray_1.TypedArray));
exports.TypedArrayFloat64 = TypedArrayFloat64;
//# sourceMappingURL=TypedArrayFloat64.js.map