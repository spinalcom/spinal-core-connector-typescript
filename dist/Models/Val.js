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
var Obj_1 = require("./Obj");
var Val = /** @class */ (function (_super) {
    __extends(Val, _super);
    function Val(data) {
        var _this = _super.call(this) || this;
        _this._data = 0;
        if (data)
            _this.set(data);
        return _this;
    }
    Val.prototype.toggle = function () {
        console.warn('toggle Val is deprecated');
        this.set(!this._data);
    };
    Val.prototype.toBoolean = function () {
        return Boolean(this._data);
    };
    Val.prototype.deep_copy = function () {
        return new Val(this._data);
    };
    Val.prototype.add = function (value) {
        if (value) {
            this._data += value;
            this._signal_change();
        }
    };
    Val.prototype._set = function (value) {
        var n;
        if (typeof value == "string") {
            if (value.slice(0, 2) == '0x') {
                n = parseInt(value, 16);
            }
            else {
                n = parseFloat(value);
                if (isNaN(n)) {
                    n = parseInt(value);
                }
                if (isNaN(n)) {
                    console.log("Don't know how to transform " + value + " to a Val");
                }
            }
        }
        else if (typeof value === "boolean")
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
    };
    return Val;
}(Obj_1.Obj));
exports.Val = Val;
//# sourceMappingURL=Val.js.map