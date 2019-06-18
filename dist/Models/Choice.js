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
var Choice = /** @class */ (function (_super) {
    __extends(Choice, _super);
    function Choice(data, initial_list) {
        if (initial_list === void 0) { initial_list = []; }
        return _super.call(this, { num: data ? data : 0, lst: initial_list }) || this;
    }
    Choice.prototype.filter = function () {
        return true;
    };
    Choice.prototype.item = function () {
        return this._nlst()[this.num.get()];
    };
    Choice.prototype.get = function () {
        var item = this.item();
        if (item)
            return item.get();
        return undefined;
    };
    Choice.prototype.toString = function () {
        return this.item().toString();
    };
    Choice.prototype.equals = function (m) {
        if (m instanceof Choice)
            return _super.prototype.equals.call(this, m);
        else
            return this._nlst()[this.num.get()].equals(m);
    };
    Choice.prototype._set = function (value) {
        //Todo might fail
        var i, j, k, len, ref;
        ref = this._nlst();
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            if (i.equals(value)) {
                return this.num.set(j);
            }
        }
        return this.num.set(value);
    };
    Choice.prototype._nlst = function () {
        return this.lst.get();
    };
    return Choice;
}(Model_1.Model));
exports.Choice = Choice;
//# sourceMappingURL=Choice.js.map