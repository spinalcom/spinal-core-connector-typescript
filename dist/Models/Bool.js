"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileSystem_1 = require("../FileSystem/FileSystem");
const Obj_1 = require("./Obj");
class Bool extends Obj_1.Obj {
    constructor(data) {
        super();
        this._data = false;
        if (data)
            this._set(data);
    }
    toggle() {
        this.set(!this._data);
    }
    toBoolean() {
        return this._data;
    }
    deep_copy() {
        return new Bool(this._data);
    }
    _set(value) {
        let n;
        if (value instanceof Bool) {
            n = value.toBoolean();
        }
        else if (value == "false") {
            n = false;
        }
        else if (value == "true") {
            n = true;
        }
        else {
            n = Boolean(value);
        }
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    }
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += `C ${this._server_id} ${Number(this._data)} `;
    }
}
exports.Bool = Bool;
//# sourceMappingURL=Bool.js.map