"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const File_1 = require("./File");
const Ptr_1 = require("./Ptr");
class TiffFile extends File_1.File {
    constructor(name = "", ptr_or_model = 0, ptr_tiff = 0, info = {}) {
        super(name, ptr_or_model, info);
        this.add_attr({
            _ptr_tiff: new Ptr_1.Ptr(ptr_tiff),
            _has_been_converted: 0
        });
    }
    load_tiff(callback) {
        return this._ptr_tiff.load(callback);
    }
}
exports.TiffFile = TiffFile;
//# sourceMappingURL=TiffFile.js.map