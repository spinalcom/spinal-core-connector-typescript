"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../Models/Model");
const ModelProcessManager_1 = require("../../ModelProcessManager");
const Ptr_1 = require("./Ptr");
class File extends Model_1.Model {
    constructor(name = "", ptr_or_model = 0, info = {}) {
        super();
        let cp_info = Object.assign({}, info);
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
        this.add_attr({
            name,
            _created_at: new Date(),
            _ptr: new Ptr_1.Ptr(ptr_or_model),
            _info: cp_info
        });
    }
    load(callback) {
        this._ptr.load(callback);
    }
}
exports.File = File;
//# sourceMappingURL=File.js.map