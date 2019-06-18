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
var Process_1 = require("./Process");
var BindProcess = /** @class */ (function (_super) {
    __extends(BindProcess, _super);
    function BindProcess(model, onChangeConstruction, func) {
        var _this = _super.call(this, model, onChangeConstruction) || this;
        _this.func = func;
        return _this;
    }
    BindProcess.prototype.onChange = function () {
        this.func();
    };
    return BindProcess;
}(Process_1.Process));
exports.BindProcess = BindProcess;
//# sourceMappingURL=BindProcess.js.map