"use strict";
exports.__esModule = true;
var ModelProcessManager_1 = require("../ModelProcessManager");
var Model_1 = require("../Models/Model");
var Process = /** @class */ (function () {
    function Process(model, onChangeConstruction) {
        if (onChangeConstruction === void 0) { onChangeConstruction = true; }
        this.models = [];
        this.process_id = ModelProcessManager_1.ModelProcessManager._cur_process_id++;
        if (model instanceof Model_1.Model) {
            model.bind(this, onChangeConstruction);
        }
        else if (model.hasOwnProperty('length')) {
            for (var i = 0; i < model.length; i++) {
                model[i].bind(this, onChangeConstruction);
            }
        }
        else {
            console.error("Process constructor doesn't know what to do with", model);
        }
    }
    Process.prototype.destructor = function () {
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var m = _a[_i];
            var index = m._processes.indexOf(this);
            if (index >= 0) {
                m._processes.splice(index, 1);
            }
        }
    };
    Process.prototype.onChange = function () { };
    return Process;
}());
exports.Process = Process;
//# sourceMappingURL=Process.js.map