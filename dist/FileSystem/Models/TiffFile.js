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
var File_1 = require("./File");
var Ptr_1 = require("./Ptr");
var TiffFile = /** @class */ (function (_super) {
    __extends(TiffFile, _super);
    function TiffFile(name, ptr_or_model, ptr_tiff, info) {
        if (name === void 0) { name = ""; }
        if (ptr_or_model === void 0) { ptr_or_model = 0; }
        if (ptr_tiff === void 0) { ptr_tiff = 0; }
        if (info === void 0) { info = {}; }
        var _this = _super.call(this, name, ptr_or_model, info) || this;
        _this.add_attr({
            _ptr_tiff: new Ptr_1.Ptr(ptr_tiff),
            _has_been_converted: 0
        });
        return _this;
    }
    TiffFile.prototype.load_tiff = function (callback) {
        return this._ptr_tiff.load(callback);
    };
    return TiffFile;
}(File_1.File));
exports.TiffFile = TiffFile;
//# sourceMappingURL=TiffFile.js.map