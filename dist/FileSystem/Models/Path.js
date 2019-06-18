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
var FileSystem_1 = require("../FileSystem");
var Path = /** @class */ (function (_super) {
    __extends(Path, _super);
    function Path(file) {
        var _this = _super.call(this) || this;
        // @ts-ignore
        var size = file ? file.hasOwnProperty("fileSize") ? file.fileSize : file.size : 0;
        _this.add_attr({
            file: file,
            remaining: size,
            to_upload: size
        });
        return _this;
    }
    Path.prototype.get_file_info = function (info) {
        info.remaining = this.remaining;
        info.to_upload = this.to_upload;
    };
    // @ts-ignore
    Path.prototype._get_fs_data = function (out) {
        _super.prototype._get_fs_data.call(this, out);
        if (typeof this.file !== "undefined" && this._server_id & 3)
            return FileSystem_1.FileSystem._files_to_upload[this._server_id] = this;
    };
    ;
    return Path;
}(Model_1.Model));
exports.Path = Path;
//# sourceMappingURL=Path.js.map