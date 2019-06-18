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
var Model_1 = require("../../Models/Model");
var ModelProcessManager_1 = require("../../ModelProcessManager");
var Ptr_1 = require("./Ptr");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(name, ptr_or_model, info) {
        if (name === void 0) { name = ""; }
        if (ptr_or_model === void 0) { ptr_or_model = 0; }
        if (info === void 0) { info = {}; }
        var _this = _super.call(this) || this;
        var cp_info = Object.assign({}, info);
        // @ts-ignore
        if (ptr_or_model instanceof Model_1.Model) {
            if (!cp_info.hasOwnProperty("model_type")) {
                // @ts-ignore
                cp_info.model_type = ModelProcessManager_1.ModelProcessManager.get_object_class(ptr_or_model);
            }
            if (ptr_or_model.hasOwnProperty('get_file_info')) {
                // @ts-ignore
                ptr_or_model.get_file_info(cp_info);
            }
        }
        _this.add_attr({
            name: name,
            _created_at: new Date(),
            _ptr: new Ptr_1.Ptr(ptr_or_model),
            _info: cp_info
        });
        return _this;
    }
    File.prototype.load = function (callback) {
        this._ptr.load(callback);
    };
    return File;
}(Model_1.Model));
exports.File = File;
//# sourceMappingURL=File.js.map