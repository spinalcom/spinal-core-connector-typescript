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
var Lst_1 = require("./Lst");
var Val_1 = require("./Val");
var Vec = /** @class */ (function (_super) {
    __extends(Vec, _super);
    function Vec(data) {
        return _super.call(this, data) || this;
    }
    Vec.prototype.base_type = function () {
        return Val_1.Val;
    };
    Vec.prototype._underlying_fs_type = function () {
        return "Lst";
    };
    return Vec;
}(Lst_1.Lst));
exports.Vec = Vec;
//# sourceMappingURL=Vec.js.map