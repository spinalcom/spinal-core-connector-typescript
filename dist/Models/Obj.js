"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const FileSystem_1 = require("../FileSystem/FileSystem");
class Obj extends Model_1.Model {
    constructor(data) {
        super();
        if (data) {
            this._set(data);
        }
    }
    toString() {
        return this._data.toString();
    }
    equals(obj) {
        if (obj instanceof Obj) {
            return this._data == obj._data;
        }
        return this._data == obj;
    }
    get() {
        return this._data;
    }
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += `C ${this._server_id} ${this.toString()} `;
    }
    _set(value) {
        if (this._data != value) {
            this._data = value;
            return true;
        }
        return false;
    }
    _get_state() {
        console.warn("get_state deprecated");
        return this._data.toString();
    }
    _set_state(str, map) {
        this.set(str);
    }
}
exports.Obj = Obj;
//# sourceMappingURL=Obj.js.map