"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Obj_1 = require("./Obj");
class Val extends Obj_1.Obj {
    constructor(data) {
        super();
        this._data = 0;
        if (data)
            this.set(data);
    }
    toggle() {
        console.warn('toggle Val is deprecated');
        this.set(!this._data);
    }
    toBoolean() {
        return Boolean(this._data);
    }
    deep_copy() {
        return new Val(this._data);
    }
    add(value) {
        if (value) {
            this._data += value;
            this._signal_change();
        }
    }
    _set(value) {
        let n;
        if (typeof value == "string") {
            if (value.slice(0, 2) == '0x') {
                n = parseInt(value, 16);
            }
            else {
                n = parseFloat(value);
                if (isNaN(n)) {
                    n = parseInt(value);
                }
                if (isNaN(n)) {
                    console.log(`Don't know how to transform ${value} to a Val`);
                }
            }
        }
        else if (typeof value === "boolean")
            n = Number(value);
        else if (value instanceof Val)
            n = value._data;
        else
            n = value;
        if (this._data != n) {
            this._data = n;
            return true;
        }
        return false;
    }
}
exports.Val = Val;
//# sourceMappingURL=Val.js.map