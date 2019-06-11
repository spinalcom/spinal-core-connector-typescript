"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Process_1 = require("./Process");
class BindProcess extends Process_1.Process {
    constructor(model, onChangeConstruction, func) {
        super(model, onChangeConstruction);
        this.func = func;
    }
    onChange() {
        this.func();
    }
}
exports.BindProcess = BindProcess;
//# sourceMappingURL=BindProcess.js.map