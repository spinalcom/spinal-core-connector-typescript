"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Obj_1 = require("./Obj");
const FileSystem_1 = require("../FileSystem/FileSystem");
class Str extends Obj_1.Obj {
    constructor(data) {
        super();
        this._data = "";
        this.length = "";
        if (data)
            this._set(data);
    }
    toggle(str, space = " ") {
        const l = this._data.split(space);
        const i = l.indexOf(str);
        if (i < 0)
            l.push(str);
        else
            l.splice(i, 1);
        this.set(l.join(" "));
    }
    contains(str) {
        return this._data.indexOf(str) !== -1;
    }
    equals(str) {
        return this._data === str.toString();
    }
    ends_with(str) {
        const l = this._data.match(str + "$");
        return typeof l !== "undefined" && l[0] === str;
    }
    deep_copy() {
        return new Str(this._data);
    }
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += `C ${this._server_id} ${encodeURI(this._data)} `;
    }
    _set(value) {
        if (typeof value == "undefined") {
            return this._set("");
        }
        const n = value.toString();
        if (this._data !== n) {
            this._data = n;
            this.length = this._data.length;
            return true;
        }
        return false;
    }
    _get_state() {
        return encodeURI(this._data);
    }
    _set_state(str, map) {
        this.set(decodeURIComponent(str));
    }
}
exports.Str = Str;
//# sourceMappingURL=Str.js.map