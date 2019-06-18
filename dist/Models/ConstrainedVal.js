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
var Model_1 = require("./Model");
var ConstrainedVal = /** @class */ (function (_super) {
    __extends(ConstrainedVal, _super);
    function ConstrainedVal(value, params) {
        if (params === void 0) { params = {}; }
        var _this = _super.call(this, {
            val: value ? value : 0,
            _min: params.min ? params.min : 0,
            _max: params.max ? params.max : 100
        }) || this;
        // @ts-ignore
        _this.add_attr({ _div: params.div ? params.div : (_this._max.get() - _this._min.get()) });
        return _this;
    }
    ConstrainedVal.prototype.get = function () {
        return this.val.get();
    };
    ConstrainedVal.prototype.ratio = function () {
        return (this.val.get() - this._min.get()) / this.delta();
    };
    ConstrainedVal.prototype.delta = function () {
        return this._max.get() - this._min.get();
    };
    ConstrainedVal.prototype.set_params = function (params) {
        this._min.set(params.min ? params.min : 0);
        this._max.set(params.min ? params.min : 100);
        this._div.set(params.div ? params.div : (this._max.get() - this._min.get()));
    };
    ConstrainedVal.prototype._set = function (value) {
        if (value instanceof ConstrainedVal) {
            return this.val.set(value.get());
        }
        var res = this.val.set(value);
        this.check_val();
        return res;
    };
    ConstrainedVal.prototype.check_val = function () {
        var v = this.val.get();
        var m = this._min.get();
        var n = this._max.get();
        var d = this._div.get();
        if (v < m) {
            this.val.set(m);
        }
        if (v > n) {
            this.val.set(n);
        }
        if (d) {
            var s = (n - m) / d;
            var r = m + Math.round((this.val.get() - m) / s) * s;
            return this.val.set(r);
        }
    };
    return ConstrainedVal;
}(Model_1.Model));
exports.ConstrainedVal = ConstrainedVal;
//# sourceMappingURL=ConstrainedVal.js.map