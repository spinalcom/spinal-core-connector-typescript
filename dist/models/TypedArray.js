"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
const FileSystem_1 = require("../FileSystem/FileSystem");
class TypedArray extends Model_1.Model {
    constructor(size, data) {
        super();
        if (typeof size === "undefined") {
            size = [];
        }
        else if (!(size.length)) {
            size = [size];
        }
        this._size = size;
        if (typeof data === "undefined") {
            const B = this.base_type();
            data = new B(this.nb_items());
            this._data = data;
        }
    }
    dim() {
        return this._size.length;
    }
    size(d) {
        if (typeof d !== "undefined")
            return this._size[d];
        else
            return this._size;
    }
    set_val(index, value) {
        index = this._get_index(index);
        if (this._data[index] != value) {
            this._data[index] = value;
            this._signal_change();
        }
    }
    nb_items() {
        let j, tot;
        tot = this._size[0] || 0;
        for (j = 1; j < this._size.length; j++) {
            tot *= this._size[j];
        }
        return tot;
    }
    toString() {
        let m = 1;
        let res = "";
        let l = this._size.map(s => {
            const o = m;
            m *= s;
            return o;
        });
        for (let i = 0; i < this._data.length; i++) {
            const data = this._data[i];
            res += data;
            for (let j = l.length - 1; j >= 0; j++) {
                if (i % l[j] == l[j] - 1) {
                    res += [" ", "\n", "\n\n"][j];
                    break;
                }
            }
        }
        return res;
    }
    // @ts-ignore
    get(index) {
        if (typeof index !== "undefined")
            return this._data[this._get_index(index)];
        return this._data;
    }
    resize(new_size) {
        let total = 1;
        for (let i = 0; i < new_size.length; i++) {
            total *= new_size[i];
        }
        const B = this.base_type();
        let n = new B(total);
        n.set(this._data);
        this._data = n;
        this._size = new_size;
        this._signal_change();
    }
    _set(str) {
        if (typeof str === "string") {
            this._set_state(str, {});
            return true;
        }
        if (this._data != str || this._size.length != 1 || this._size[0] != str.length) {
            const B = this.base_type();
            this._data = new B(str);
            this._size = [str.length];
            return true;
        }
        return false;
    }
    _get_index(index) {
        if (index.length) {
            let o = 0;
            let m = 1;
            for (let i = 0; i < index.length; i++) {
                o += m * index[i];
                m *= this._size[i];
            }
            return o;
        }
        return index;
    }
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += `C ${this._server_id} ${this._get_state()} `;
    }
    _get_state() {
        let res = "";
        res += this._size.length;
        for (let i = 0; i < this._size.length; i++) {
            res += "," + this._size[i];
        }
        for (let i = 0; i < this._data.length; i++) {
            res += "," + this._data[i];
        }
        return res;
    }
    _set_state(str, map) {
        const l = str.split(",");
        let s = parseInt(l[0]);
        const size = [];
        for (let i = 0; i < s; i++) {
            size.push(l[i + 1]);
        }
        this._size = size;
        const b = this.base_type();
        let n = this.nb_items();
        this._data = new b(n);
        for (let i = 0; i < n; i++) {
            // @ts-ignore
            this._data[i] = parseFloat(l[s + 1 + i]);
        }
    }
}
exports.TypedArray = TypedArray;
//# sourceMappingURL=TypedArray.js.map