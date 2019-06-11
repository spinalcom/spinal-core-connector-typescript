"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class Choice extends Model_1.Model {
    constructor(data, initial_list = []) {
        super({ num: data ? data : 0, lst: initial_list });
    }
    filter() {
        return true;
    }
    item() {
        return this._nlst()[this.num.get()];
    }
    get() {
        const item = this.item();
        if (item)
            return item.get();
        return undefined;
    }
    toString() {
        return this.item().toString();
    }
    equals(m) {
        if (m instanceof Choice)
            return super.equals(m);
        else
            return this._nlst()[this.num.get()].equals(m);
    }
    _set(value) {
        //Todo might fail
        var i, j, k, len, ref;
        ref = this._nlst();
        for (j = k = 0, len = ref.length; k < len; j = ++k) {
            i = ref[j];
            if (i.equals(value)) {
                return this.num.set(j);
            }
        }
        return this.num.set(value);
    }
    _nlst() {
        return this.lst.get();
    }
}
exports.Choice = Choice;
//# sourceMappingURL=Choice.js.map