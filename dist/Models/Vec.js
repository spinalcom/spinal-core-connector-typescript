"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Lst_1 = require("./Lst");
const Val_1 = require("./Val");
class Vec extends Lst_1.Lst {
    constructor(data) {
        super(data);
    }
    base_type() {
        return Val_1.Val;
    }
    _underlying_fs_type() {
        return "Lst";
    }
}
exports.Vec = Vec;
//# sourceMappingURL=Vec.js.map