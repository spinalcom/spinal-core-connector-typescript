"use strict";
exports.__esModule = true;
var Process_1 = require("../Processes/Process");
var BindProcess_1 = require("../Processes/BindProcess");
var FileSystem_1 = require("../FileSystem/FileSystem");
var ModelProcessManager_1 = require("../ModelProcessManager");
var Model = /** @class */ (function () {
    function Model(attr) {
        this._attribute_names = [];
        this._processes = [];
        this._parents = [];
        this.model_id = ModelProcessManager_1.ModelProcessManager._cur_mid++;
        if (attr) {
            this.set(attr);
        }
    }
    Model.prototype.destructor = function () {
    };
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @returns {boolean}
     */
    Model.prototype.hasBeenModified = function () {
        //Todo Understand ModelProcessManager counter
        return this._date_last_modification > ModelProcessManager_1.ModelProcessManager._counter - 2 || ModelProcessManager_1.ModelProcessManager._force_m;
    };
    /**
     * return true if this has changed since previous synchronisation due to a
     * direct modification (not from a child one)
     * @returns {boolean}
     */
    Model.prototype.has_been_directly_modified = function () {
        return this._date_last_modification > ModelProcessManager_1.ModelProcessManager._counter - 1 || ModelProcessManager_1.ModelProcessManager._force_m;
    };
    /**
     * if this has been modified during the preceding round, f will be called
     * @param f {Process| BindCallBack} If f is a process:
     * process.onchange will be called each time this (or a child of this) will
     * be modified.
     * process.destructor will be called if this is destroyed.
     * can be seen as a bind with an object
     *onchange_construction
     *
     * @param onChangeConstruction {boolean} true means that onchange will be automatically called after the bind
     */
    Model.prototype.bind = function (f, onChangeConstruction) {
        if (onChangeConstruction === void 0) { onChangeConstruction = false; }
        if (f instanceof Process_1.Process) {
            this._processes.push(f);
            f.models.push(this);
            if (onChangeConstruction) {
                ModelProcessManager_1.ModelProcessManager._n_processes[f.process_id] = f;
                ModelProcessManager_1.ModelProcessManager._need_sync_processes();
            }
        }
        else {
            new BindProcess_1.BindProcess(this, onChangeConstruction, f);
        }
    };
    /**
     *
     * @param f {Process | BindCallBack}
     */
    Model.prototype.unbind = function (f) {
        if (f instanceof Process_1.Process) {
            this._processes.splice(this._processes.indexOf(f), 1);
            f.models.splice(f.models.indexOf(this), 1);
        }
        else
            for (var _i = 0, _a = this._processes; _i < _a.length; _i++) {
                var p = _a[_i];
                if (p instanceof BindProcess_1.BindProcess && p.func === f) {
                    this.unbind(p);
                }
            }
    };
    /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     */
    Model.prototype.get = function () {
        var res = {};
        for (var _i = 0, _a = this._attribute_names; _i < _a.length; _i++) {
            var name_1 = _a[_i];
            res[name_1] = this[name_1].get();
        }
        return res;
    };
    /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     * @param value
     */
    Model.prototype.set = function (value) {
        if (this._set(value)) {
            this._signal_change();
            return true;
        }
        return false;
    };
    /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param str
     */
    Model.prototype.set_state = function (str) {
        var map = {};
        var lst = str.split('\n');
        var mid = lst.shift();
        for (var i = 0; i < lst.length; i++) {
            var l = lst[i];
            if (!l.length) {
                continue;
            }
            var s = l.split(" ");
            map[s[0]] = {
                type: s[1],
                data: s[2],
                buff: void 0
            };
        }
        map[mid].buff = this;
        this._set_state(map[mid].data, map);
    };
    Model.prototype.get_state = function (date) {
        if (date === void 0) { date = -1; }
        var fmm = {};
        this._get_flat_model_map(fmm, date);
        var res = this.model_id.toString();
        if (this._date_last_modification > date) {
            for (var key in fmm) {
                if (fmm.hasOwnProperty(key)) {
                    var obj = fmm[key];
                    res += "\n" + obj.model_id + " " + ModelProcessManager_1.ModelProcessManager.get_object_class(obj) + " " + obj._get_state();
                }
            }
        }
        return res;
    };
    /**
     *
     * @param n {string | object} name of the attribute for p or a javascript
     * object
     * @param p
     * @param signalChange
     */
    Model.prototype.add_attr = function (n, p, signalChange) {
        if (signalChange === void 0) { signalChange = true; }
        if (typeof p !== "undefined" && p !== null) {
            if (typeof p === "function") {
                this[n] = p;
            }
            else {
                if (this.hasOwnProperty(n))
                    console.error("attribute " + n + " already exist in " + ("" + ModelProcessManager_1.ModelProcessManager.get_object_class(this)));
                // @ts-ignore
                p = ModelProcessManager_1.ModelProcessManager.conv(p);
                if ((p instanceof Model) && p._parents.indexOf(this) === -1) {
                    p._parents.push(this);
                }
                this._attribute_names.push(n);
                this[n] = p;
                if (signalChange)
                    this._signal_change();
            }
        }
        else {
            for (var key in n) {
                if (n.hasOwnProperty(key)) {
                    this.add_attr(key, n[key], signalChange);
                }
            }
        }
    };
    /**
     *
     * @param name {string} name of the attribute to remove
     * @param signalChange
     */
    Model.prototype.rem_attr = function (name, signalChange) {
        if (signalChange === void 0) { signalChange = true; }
        var c = this[name];
        if (c) {
            var i = c._parents.indexOf(this);
            if (i >= 0) {
                c._parents.splice(i, 1);
                if (c._parents.length === 0) {
                    c.destructor();
                }
            }
            delete this[name];
            i = this._attribute_names.indexOf(typeof name === "string" ? name : String(name));
            if (i >= 0)
                this._attribute_names.splice(i, 1);
            if (signalChange)
                this._signal_change();
        }
    };
    /**
     *
     * @param name {string} name of the attribute to change
     * @param value {Model | Function} value of the attribute
     */
    Model.prototype.mod_attr = function (name, value) {
        if (this[name] !== value) {
            this.rem_attr(name),
                this.add_attr(name, value);
        }
    };
    /**
     * add / mod/ rem attr to get the same data than o
     * @param o {object}
     */
    Model.prototype.set_attr = function (o) {
        for (var key in o) {
            if (o.hasOwnProperty(key))
                this.mod_attr(key, o[key]);
        }
        var to_rem = [];
        for (var _i = 0, _a = this._attribute_names; _i < _a.length; _i++) {
            var name_2 = _a[_i];
            if (this._attribute_names.hasOwnProperty(name_2) && o.hasOwnProperty(name_2)) {
                to_rem.push(name_2);
            }
        }
        for (var _b = 0, to_rem_1 = to_rem; _b < to_rem_1.length; _b++) {
            var key = to_rem_1[_b];
            this.rem_attr(key);
        }
    };
    /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     * [ nb_row, nb_cols ] for a matrix...
     * @param forDisplay {boolean}
     */
    Model.prototype.size = function (forDisplay) {
        console.warn("function size is deprecated");
        return [];
    };
    /**
     *
     * @param forDisplay
     */
    Model.prototype.dim = function (forDisplay) {
        console.warn("function dim is deprecated");
        return this.size(forDisplay).length;
    };
    Model.prototype.equals = function (m) {
        if (this === m)
            return true;
        if (m.hasOwnProperty("_attribute_names")) {
            for (var _i = 0, _a = m._attribute_names; _i < _a.length; _i++) {
                var key = _a[_i];
                var val = m[key];
                if (!(this.hasOwnProperty(key)) || !this[key].equals(val))
                    return false;
            }
            for (var _b = 0, _c = this._attribute_names; _b < _c.length; _b++) {
                var name_3 = _c[_b];
                if (m._attribute_names.indexOf(name_3) === -1)
                    return false;
            }
            return true;
        }
        return false;
    };
    Model.prototype.get_parents_that_chekc = function (func_to_check) {
        var res = [];
        var visited = {};
        this._get_parents_that_check_rec(res, visited, func_to_check);
    };
    Model.prototype.deep_copy = function () {
        var j, key, len, o, ref, __new__;
        o = {};
        ref = this._attribute_names;
        for (j = 0, len = ref.length; j < len; j++) {
            key = ref[j];
            o[key] = this[key].deep_copy();
        }
        eval(" __new__ = new " + ModelProcessManager_1.ModelProcessManager.get_object_class(this) + ";");
        __new__.set_attr(o);
        return __new__;
    };
    Model.prototype.real_change = function () {
        if (this.has_been_directly_modified() && !this._attribute_names.length) {
            return true;
        }
        for (var _i = 0, _a = this._attribute_names; _i < _a.length; _i++) {
            var name_4 = _a[_i];
            if (this.cosmetic_attribute(name_4))
                continue;
            if (this[name_4].real_change())
                return true;
        }
        return false;
    };
    Model.prototype.cosmetic_attribute = function (name) {
        return false;
    };
    Model.prototype._get_state = function () {
        console.warn("_get_state deprecated");
        var str = [];
        for (var _i = 0, _a = this._attribute_names; _i < _a.length; _i++) {
            var name_5 = _a[_i];
            str.push(name_5 + ":" + this[name_5].model_id);
        }
        return str.join(",");
    };
    /**
     * Send data to server
     * @param out
     *
     */
    Model.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        var str = [];
        for (var i = 0; i < this._attribute_names.length; i++) {
            var attr = this._attribute_names[i];
            var obj = this[attr];
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, obj);
            str.push(attr + ":" + obj._server_id);
        }
        return out.mod += "C " + this._server_id + " " + str.join(",") + " ";
    };
    Model.prototype._set = function (value) {
        var change = false;
        var used = {};
        for (var _i = 0, _a = ModelProcessManager_1.ModelProcessManager._get_attribute_names(value); _i < _a.length; _i++) {
            var key = _a[_i];
            used[key] = true;
        }
        for (var _b = 0, _c = this._attribute_names; _b < _c.length; _b++) {
            var key = _c[_b];
            if (!used.hasOwnProperty(key))
                this.rem_attr(key);
        }
        for (var key in value) {
            if (value.hasOwnProperty(key) && value[key]) {
                if (this[key] && this[key].constructor === value[key].constructor)
                    change = change ? change : this[key].set(value[key]);
                else {
                    change = true;
                    this.mod_attr(key, value[key]);
                }
            }
            else {
                this.add_attr(key, value[key], false);
            }
        }
        return change;
    };
    Model.prototype._signal_change = function (change_level) {
        if (change_level === void 0) { change_level = 2; }
        if (change_level === 2 && this._server_id) {
            FileSystem_1.FileSystem.signal_change(this);
        }
        ModelProcessManager_1.ModelProcessManager._modlist[this.model_id] = this;
        if (this._date_last_modification < ModelProcessManager_1.ModelProcessManager._counter) {
            this._date_last_modification = ModelProcessManager_1.ModelProcessManager._counter + change_level;
            for (var _i = 0, _a = this._parents; _i < _a.length; _i++) {
                var parent_1 = _a[_i];
                parent_1._signal_change(1);
            }
        }
        ModelProcessManager_1.ModelProcessManager._need_sync_processes();
    };
    // generic definition of _set_state. ( called by _use_state )
    Model.prototype._set_state = function (str, map) {
        var u = {};
        if (str.length) {
            for (var _i = 0, _a = str.split(','); _i < _a.length; _i++) {
                var spl = _a[_i];
                var inr = spl.split(':');
                var attr = inr[0];
                var k_id = inr[1];
                u[attr] = true;
                if (map[k_id].buff) {
                    if (!this[attr]) {
                        this.add_attr(attr, map[k_id].buff);
                    }
                    else if (map[k_id].buff !== this[attr]) {
                        this.mod_attr(attr, map[k_id].buff);
                    }
                }
                else if (!this[attr])
                    this.add_attr(attr, ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
                else if (!this[attr]._set_state_if_same_type(k_id, map))
                    this.mod_attr(attr, ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
            }
        }
        for (var _b = 0, _c = this._attribute_names; _b < _c.length; _b++) {
            var name_6 = _c[_b];
            if (u.hasOwnProperty(name_6) && u[name_6])
                this.rem_attr(name_6);
        }
    };
    Model.prototype._get_parents_that_check_rec = function (res, visited, fun_to_check) {
        if (!visited.hasOwnProperty(this.model_id)) {
            visited[this.model_id] = true;
            if (fun_to_check(this)) {
                res.push(this);
            }
            else
                for (var _i = 0, _a = this._parents; _i < _a.length; _i++) {
                    var parent_2 = _a[_i];
                    parent_2._get_parents_that_chec_rec(res, visited, fun_to_check);
                }
        }
    };
    Model.prototype._set_state_if_same_type = function (mid, map) {
        var data = map[mid];
        if (ModelProcessManager_1.ModelProcessManager.get_object_class(this) === data.type) {
            data.buff = this;
            this._set_state(data.data, map);
            return true;
        }
        return false;
    };
    Model.prototype._get_flat_model_map = function (map, date) {
        map[this.model_id] = this;
        for (var _i = 0, _a = this._attribute_names; _i < _a.length; _i++) {
            var name_7 = _a[_i];
            var obj = this[name_7];
            if (!map[obj.model_id]) {
                if (obj._date_last_modification > date)
                    obj._get_flat_model_map(map, date);
            }
        }
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map