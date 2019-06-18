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
var ConstOrNotModel = /** @class */ (function (_super) {
    __extends(ConstOrNotModel, _super);
    function ConstOrNotModel(bool, model, check_disabled) {
        if (check_disabled === void 0) { check_disabled = true; }
        return _super.call(this, { bool: bool, model: model, check_disabled: check_disabled }) || this;
    }
    ConstOrNotModel.prototype.get = function () {
        if (this.model)
            return this.model.get();
    };
    ConstOrNotModel.prototype.set = function (value) {
        if (this.model)
            return this.model.set(value);
        return false;
    };
    ConstOrNotModel.prototype.toString = function () {
        if (this.model)
            return this.model.toString();
        return "";
    };
    return ConstOrNotModel;
}(Model_1.Model));
exports.ConstOrNotModel = ConstOrNotModel;
//# sourceMappingURL=ConstOrNot.js.map