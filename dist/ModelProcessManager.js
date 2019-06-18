"use strict";
exports.__esModule = true;
/***
 * @property _cur_mid {number} current model id (used to create new ids)
 * @property _counter {number} nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
 * @property _modlist {number} changed models (current round)
 * @property _n_processes {number} new processes (that will need a first onchange call in "force" mode)
 * @property _cur_process_id {number} current process id (used to create new ids)
 * @property _timeout {number} timer used to create a new "round"
 * @property _force_m {number} if _force_m == true, every has_been_modified function will return true
 * @property _synchro {number} synchronizer (link to the server that will store files)
 *
 */
var Model_1 = require("./Models/Model");
var Bool_1 = require("./Models/Bool");
var Obj_1 = require("./Models/Obj");
var Lst_1 = require("./Models/Lst");
var Val_1 = require("./Models/Val");
var Str_1 = require("./Models/Str");
var ModelProcessManager = /** @class */ (function () {
    function ModelProcessManager() {
    }
    ModelProcessManager.new_from_state = function (str) {
        var map = {};
        var lst = str.split("\n");
        var mid = lst.shift();
        for (var _i = 0, lst_1 = lst; _i < lst_1.length; _i++) {
            var sub = lst_1[_i];
            if (sub.length) {
                var s = sub.split(" ");
                map[s[0]] = {
                    type: s[1],
                    data: s[2],
                    buff: undefined
                };
            }
        }
        // fill / update this with data in map[ mid ]
        var __new__ = eval("new " + map[mid].type + ";");
        __new__._set_state(map[mid].data, map);
        return __new__;
    };
    ModelProcessManager.load = function (filename, func) {
        console.warn("Model Process Manager load deprecated");
        // @ts-ignore
        if (!ModelProcessManager.synchronizer) {
            // @ts-ignore
            ModelProcessManager._synchro = new Synchronizer();
        }
        ModelProcessManager._synchro.load(filename, func);
    };
    ModelProcessManager.conv = function (model) {
        if (model instanceof Model_1.Model) {
            return model;
        }
        if (model instanceof Array) {
            return new Lst_1.Lst(model);
        }
        if (typeof model === "string") {
            return new Str_1.Str(model);
        }
        if (typeof model === "number") {
            return new Val_1.Val(model);
        }
        if (typeof model === "boolean") {
            return new Bool_1.Bool(model);
        }
        if (model instanceof Object) {
            return new Model_1.Model(model);
        }
        return new Obj_1.Obj(model);
    };
    ModelProcessManager.get_object_class = function (obj) {
        if (obj && obj.constructor && obj.constructor.name) {
            return obj.constructor.name;
        }
        if (obj && obj.constructor && obj.constructor.toString) {
            var arr = void 0;
            arr = obj.constructor.toString().match(/function\s*(\w+)/);
            if (!arr) {
                arr = obj.constructor.toString().match(/class\s*(\w+)/);
            }
            if (arr && arr.length === 2) {
                return arr[1];
            }
        }
    };
    ModelProcessManager._get_attribute_names = function (m) {
        if (m instanceof Model_1.Model) {
            return m._attribute_names;
        }
        return Object.keys(m);
    };
    ModelProcessManager._new_model_from_state = function (mid, map) {
        var info = map[mid];
        info.buff = eval("new " + info.type + ";");
        info.buff._set_state(info.data, map);
        return info.buff;
    };
    ModelProcessManager._need_sync_processes = function () {
        if (!ModelProcessManager._timeout)
            ModelProcessManager._timeout = setTimeout(ModelProcessManager._sync_processes, 1);
    };
    ModelProcessManager._sync_processes = function () {
        var processes = {};
        for (var key in ModelProcessManager._modlist) {
            if (ModelProcessManager._modlist.hasOwnProperty(key)) {
                var model = ModelProcessManager._modlist[key];
                for (var _i = 0, _a = model._processes; _i < _a.length; _i++) {
                    var process_1 = _a[_i];
                    processes[process_1.process_id] = {
                        value: process_1,
                        force: false
                    };
                }
            }
        }
        for (var key in ModelProcessManager._n_processes) {
            if (ModelProcessManager._n_processes.hasOwnProperty(key)) {
                processes[key] = {
                    value: ModelProcessManager._n_processes[key],
                    force: true
                };
            }
        }
        ModelProcessManager._timeout = undefined;
        ModelProcessManager._modlist = {};
        ModelProcessManager._n_processes = {};
        ModelProcessManager._counter += 2;
        for (var key in processes) {
            if (processes.hasOwnProperty(key)) {
                var process_2 = processes[key];
                ModelProcessManager._force_m = process_2.force;
                process_2.value.onChange();
            }
        }
        ModelProcessManager._force_m = false;
    };
    ModelProcessManager._cur_mid = 0;
    ModelProcessManager._counter = 0;
    ModelProcessManager._modlist = {};
    ModelProcessManager._n_processes = {};
    ModelProcessManager._cur_process_id = 0;
    ModelProcessManager._timeout = undefined;
    ModelProcessManager._force_m = false;
    ModelProcessManager._synchro = undefined;
    return ModelProcessManager;
}());
exports.ModelProcessManager = ModelProcessManager;
//# sourceMappingURL=ModelProcessManager.js.map