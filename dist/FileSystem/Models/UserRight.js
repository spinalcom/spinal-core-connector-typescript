"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../Models/Model");
class UserRight extends Model_1.Model {
    constructor() {
        super();
    }
    // @ts-ignore
    set() {
        console.log("Set a UserRight is not allowed.");
    }
}
exports.UserRight = UserRight;
//# sourceMappingURL=UserRight.js.map