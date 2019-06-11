"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("./Model");
class ConstOrNotModel extends Model_1.Model {
    constructor(bool, model, check_disabled = true) {
        super({ bool, model, check_disabled });
    }
    get() {
        if (this.model)
            return this.model.get();
    }
    set(value) {
        if (this.model)
            return this.model.set(value);
        return false;
    }
    toString() {
        if (this.model)
            return this.model.toString();
        return "";
    }
}
exports.ConstOrNotModel = ConstOrNotModel;
//# sourceMappingURL=ConstOrNot.js.map