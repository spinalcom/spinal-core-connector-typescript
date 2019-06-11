"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelProcessManager_1 = require("../ModelProcessManager");
const Model_1 = require("../Models/Model");
class Process {
    constructor(model, onChangeConstruction = true) {
        this.models = [];
        this.process_id = ModelProcessManager_1.ModelProcessManager._cur_process_id++;
        if (model instanceof Model_1.Model) {
            model.bind(this, onChangeConstruction);
        }
        else if (model.hasOwnProperty('length')) {
            for (let i = 0; i < model.length; i++) {
                model[i].bind(this, onChangeConstruction);
            }
        }
        else {
            console.error("Process constructor doesn't know what to do with", model);
        }
    }
    destructor() {
        for (let m of this.models) {
            let index = m._processes.indexOf(this);
            if (index >= 0) {
                m._processes.splice(index, 1);
            }
        }
    }
    onChange() { }
}
exports.Process = Process;
//# sourceMappingURL=Process.js.map