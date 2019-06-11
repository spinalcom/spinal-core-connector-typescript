"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../Models/Model");
const FileSystem_1 = require("../FileSystem");
class Path extends Model_1.Model {
    constructor(file) {
        super();
        // @ts-ignore
        this._get_fs_data = out => {
            super._get_fs_data(out);
            if (typeof this.file !== "undefined" && this._server_id & 3)
                FileSystem_1.FileSystem._files_to_upload[this._server_id] = this;
        };
        // @ts-ignore
        let size = file ? file.hasOwnProperty("fileSize") ? file.fileSize : file.size : 0;
        this.add_attr({
            file: file,
            remaining: size,
            to_upload: size
        });
    }
    get_file_info(info) {
        info.remaining = this.remaining;
        info.to_upload = this.to_upload;
    }
}
exports.Path = Path;
//# sourceMappingURL=Path.js.map