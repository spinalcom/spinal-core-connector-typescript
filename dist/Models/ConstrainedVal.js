"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class ConstrainedVal extends Model_1.Model {
    constructor(value, params = {}) {
        super({
            val: value ? value : 0,
            _min: params.min ? params.min : 0,
            _max: params.max ? params.max : 100
        });
        // @ts-ignore
        this.add_attr({ _div: params.div ? params.div : (this._max.get() - this._min.get()) });
    }
    get() {
        return this.val.get();
    }
    ratio() {
        return (this.val.get() - this._min.get()) / this.delta();
    }
    delta() {
        return this._max.get() - this._min.get();
    }
    set_params(params) {
        this._min.set(params.min ? params.min : 0);
        this._max.set(params.min ? params.min : 100);
        this._div.set(params.div ? params.div : (this._max.get() - this._min.get()));
    }
    _set(value) {
        if (value instanceof ConstrainedVal) {
            return this.val.set(value.get());
        }
        const res = this.val.set(value);
        this.check_val();
        return res;
    }
    check_val() {
        const v = this.val.get();
        const m = this._min.get();
        const n = this._max.get();
        const d = this._div.get();
        if (v < m) {
            this.val.set(m);
        }
        if (v > n) {
            this.val.set(n);
        }
        if (d) {
            const s = (n - m) / d;
            const r = m + Math.round((this.val.get() - m) / s) * s;
            return this.val.set(r);
        }
    }
}
exports.ConstrainedVal = ConstrainedVal;
//# sourceMappingURL=ConstrainedVal.js.map