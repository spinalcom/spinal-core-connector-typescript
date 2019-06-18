"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Model_1 = require("./Model");
var ModelProcessManager_1 = require("../ModelProcessManager");
var FileSystem_1 = require("../FileSystem/FileSystem");
var Lst = /** @class */ (function (_super) {
    __extends(Lst, _super);
    function Lst(data) {
        var _this = _super.call(this) || this;
        _this.length = 0;
        var s = _this.static_length();
        if (s >= 0) {
            var d = _this.default_value();
            for (var i = 0; i <= s; i++) {
                // @ts-ignore
                _this.push(d, true);
            }
        }
        if (data)
            _this._set(data);
        return _this;
    }
    Lst.prototype.static_length = function () {
        return -1;
    };
    Lst.prototype.default_value = function () {
        return 0;
    };
    Lst.prototype.base_type = function () {
        return undefined;
    };
    Lst.prototype.get = function () {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            if (this[i])
                res.push(this[i].get());
        }
        return res;
    };
    Lst.prototype.size = function () {
        return [this.length];
    };
    Lst.prototype.toString = function () {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            res.push(this[i].toString());
        }
        if (res.length > 0)
            return res.join();
        return "";
    };
    Lst.prototype.equals = function (lst) {
        if (lst.length !== this.length)
            return false;
        for (var i = 0; i < this.length; i++) {
            if (!this[i].equals(lst[i]))
                return false;
        }
        return true;
    };
    Lst.prototype.push = function (value, force) {
        if (force === void 0) { force = false; }
        if (this._static_size_check(force))
            return;
        var b = this.base_type();
        if (b) {
            if (!(value instanceof b))
                value = new b(value);
        }
        else {
            // @ts-ignore
            value = ModelProcessManager_1.ModelProcessManager.conv(value);
        }
        // @ts-ignore
        if (value._parents.indexOf(this) === -1) {
            // @ts-ignore
            value._parents.push(this);
        }
        this[this.length++] = value;
        this._signal_change();
    };
    Lst.prototype.pop = function () {
        if (this._static_size_check(false)) {
            return;
        }
        if (this.length <= 0)
            return;
        var res = this[--this.length];
        this.rem_attr(this.length);
        return res;
    };
    Lst.prototype.clear = function () {
        while (this.length) {
            this.pop();
        }
    };
    Lst.prototype.unshift = function (value) {
        if (this._static_size_check(false))
            return;
        var b = this.base_type();
        if (b) {
            if (!(value instanceof b))
                value = new b(value);
        }
        else {
            // @ts-ignore
            value = ModelProcessManager_1.ModelProcessManager.conv(value);
        }
        // @ts-ignore
        if (value._parents.indexOf(this) === -1) {
            // @ts-ignore
            value._parents.push(this);
        }
        if (this.length)
            for (var i = this.length; function (i) { return 0; }; i--) {
                this[i + 1] = this[i];
            }
        this[0] = value;
        this.length++;
        this._signal_change();
        return this.length;
    };
    Lst.prototype.shift = function () {
        var res = this[0];
        this.slice(0, 1);
        return res;
    };
    Lst.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0)
            this.slice(index, 1);
    };
    Lst.prototype.remove_ref = function (item) {
        var index = this.indexOf_ref(item);
        if (index >= 0)
            this.slice(index, 1);
    };
    Lst.prototype.filter = function (f) {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            if (f(this[i]))
                res.push(this[i]);
        }
        return res;
    };
    Lst.prototype.detect = function (f) {
        for (var i = 0; i < this.length; i++) {
            if (f(this[i]))
                return this[i];
        }
        return undefined;
    };
    Lst.prototype.sorted = function (sort) {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            res.push(this[i]);
        }
        return res.sort(sort);
    };
    Lst.prototype.has = function (f) {
        for (var i = 0; i < this.length; i++) {
            if (f(this[i]))
                return true;
        }
        return false;
    };
    Lst.prototype.indexOf = function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i].equals(value))
                return 1;
        }
        return -1;
    };
    Lst.prototype.indexOf_ref = function (value) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == value)
                return i;
        }
        return -1;
    };
    Lst.prototype.contains = function (value) {
        return this.indexOf(value) !== -1;
    };
    Lst.prototype.contains_ref = function (value) {
        return this.indexOf_ref(value) !== -1;
    };
    Lst.prototype.toggle = function (value) {
        var index = this.indexOf(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        }
        else {
            this.push(value);
            return true;
        }
    };
    Lst.prototype.toggle_ref = function (value) {
        var index = this.indexOf_ref(value);
        if (index !== -1) {
            this.splice(index);
            return false;
        }
        else {
            this.push(value);
            return true;
        }
    };
    Lst.prototype.slice = function (begin, end) {
        if (end === void 0) { end = this.length; }
        var res = new Lst();
        if (begin < 0)
            begin = 0;
        if (end > this.length)
            end = this.length;
        for (var i = begin; i < end; i++) {
            res.push(this[i].get());
        }
        return res;
    };
    Lst.prototype.concat = function (new_tab, force) {
        if (force === void 0) { force = false; }
        if (this._static_size_check(force))
            return;
        if (new_tab.length) {
            for (var i = 0; i < new_tab.length; i++) {
                this.push(new_tab[i]);
            }
        }
    };
    Lst.prototype.splice = function (index, n) {
        if (n === void 0) { n = 1; }
        if (this._static_size_check(false))
            return;
        var end = Math.min(index + n, this.length);
        for (var i = index; i < end; i++) {
            this.rem_attr(i);
        }
        for (var i = index; i < this.length - n; i++) {
            this[i] = this[i + n];
        }
        for (var i = this.length - n; i < this.length; i++) {
            delete this[i];
        }
        this.length -= n;
        this._signal_change();
    };
    Lst.prototype.insert = function (index, lst) {
        var end = Math.max(this.length - index, 0);
        var res = [];
        for (var i = 0; i < end; i++) {
            res.push(this.pop());
        }
        res.reverse();
        for (var i = 0; i < lst.length; i++) {
            this.push(lst[i]);
        }
        for (var i = 0; i < res.length; i++) {
            this.push(res[i]);
        }
    };
    Lst.prototype.set_or_push = function (index, val) {
        if (index < this.length) {
            // @ts-ignore
            return this.mod_attr(index, val);
        }
        if (index === this.length) {
            this.push(val);
        }
    };
    Lst.prototype.trim = function (size) {
        while (this.length > size)
            this.pop();
    };
    Lst.prototype.join = function (sep) {
        return this.get().join(sep);
    };
    Lst.prototype.deep_copy = function () {
        var res = new Lst();
        for (var i = 0; i < this.length; i++) {
            res.push(this[i].deep_copy());
        }
        return res;
    };
    Lst.prototype.back = function () {
        return this[this.length - 1];
    };
    Lst.prototype.real_change = function () {
        if (this.has_been_directly_modified())
            return true;
        for (var i = 0; i < this.length; i++) {
            if (this[i].real_change())
                return true;
        }
        return false;
    };
    Lst.prototype._set = function (value) {
        var change = Number(this.length != value.length);
        var s = this.static_length();
        if (s >= 0 && change) {
            console.error("resizing a static array (type " + ModelProcessManager_1.ModelProcessManager.get_object_class(this) + ") is forbidden");
        }
        for (var i = 0; i < value.length; i++) {
            if (i < this.length)
                change |= this[i].set(value[i]);
            else if (s < 0) {
                this.push(value[i]);
            }
        }
        if (s < 0) {
            while (this.length > value.length) {
                this.pop();
            }
            this.length = value.length;
        }
        return Boolean(change);
    };
    Lst.prototype._get_flat_model_map = function (map, date) {
        map[this.model_id] = this;
        for (var i = 0; i < this.length; i++) {
            if (!map.hasOwnProperty(this[i]))
                if (this[i]._date_last_modification > date)
                    this[i]._get_flat_model_map(map, date);
        }
        return map;
    };
    Lst.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        var res = [];
        for (var i = 0; i < this.length; i++) {
            var obj = this[i];
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, obj);
            res.push(obj._server_id);
        }
        return out.mod += "C " + this._server_id + " " + res.join(",") + " ";
    };
    Lst.prototype._get_state = function () {
        var res = [];
        for (var i = 0; i < this.length; i++) {
            res.push(this[i].model_id);
        }
        return res.join(",");
    };
    Lst.prototype._set_state = function (str, map) {
        var l_id = str.split(",").filter(function (x) { return x.length; });
        while (this.length > l_id.length)
            this.pop();
        for (var i = 0; i < this.length; i++) {
            var k_id = l_id[i];
            if (map[k_id].buff) {
                if (map[k_id].buff != this[i])
                    this.mod_attr(i, map[k_id].buff);
            }
            else if (!this[i]._set_state_if_same_type(k_id, map)) {
                this.mod_attr(i, ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
            }
        }
        for (var i = this.length; i < l_id.length; i++) {
            var k_id = l_id[i];
            if (map[k_id].hasOwnProperty("buff") && map[k_id].buff !== null)
                this.push(map[k_id].buff);
            else
                this.push(ModelProcessManager_1.ModelProcessManager._new_model_from_state(k_id, map));
        }
    };
    Lst.prototype._static_size_check = function (force) {
        if (this.static_length() >= 0 && !force) {
            console.error("resizing a static array (type " +
                (ModelProcessManager_1.ModelProcessManager.get_object_class(this) + ") is forbidden"));
            return true;
        }
        return false;
    };
    return Lst;
}(Model_1.Model));
exports.Lst = Lst;
//# sourceMappingURL=Lst.js.map