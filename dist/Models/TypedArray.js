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
var FileSystem_1 = require("../FileSystem/FileSystem");
var TypedArray = /** @class */ (function (_super) {
    __extends(TypedArray, _super);
    function TypedArray(size, data) {
        var _this = _super.call(this) || this;
        if (typeof size === "undefined") {
            size = [];
        }
        else if (!(size.length)) {
            size = [size];
        }
        _this._size = size;
        if (typeof data === "undefined") {
            var B = _this.base_type();
            data = new B(_this.nb_items());
            _this._data = data;
        }
        return _this;
    }
    TypedArray.prototype.dim = function () {
        return this._size.length;
    };
    TypedArray.prototype.size = function (d) {
        if (typeof d !== "undefined")
            return this._size[d];
        else
            return this._size;
    };
    TypedArray.prototype.set_val = function (index, value) {
        index = this._get_index(index);
        if (this._data[index] != value) {
            this._data[index] = value;
            this._signal_change();
        }
    };
    TypedArray.prototype.nb_items = function () {
        var j, tot;
        tot = this._size[0] || 0;
        for (j = 1; j < this._size.length; j++) {
            tot *= this._size[j];
        }
        return tot;
    };
    TypedArray.prototype.toString = function () {
        var m = 1;
        var res = "";
        var l = this._size.map(function (s) {
            var o = m;
            m *= s;
            return o;
        });
        for (var i = 0; i < this._data.length; i++) {
            var data = this._data[i];
            res += data;
            for (var j = l.length - 1; j >= 0; j++) {
                if (i % l[j] == l[j] - 1) {
                    res += [" ", "\n", "\n\n"][j];
                    break;
                }
            }
        }
        return res;
    };
    // @ts-ignore
    TypedArray.prototype.get = function (index) {
        if (typeof index !== "undefined")
            return this._data[this._get_index(index)];
        return this._data;
    };
    TypedArray.prototype.resize = function (new_size) {
        var total = 1;
        for (var i = 0; i < new_size.length; i++) {
            total *= new_size[i];
        }
        var B = this.base_type();
        var n = new B(total);
        n.set(this._data);
        this._data = n;
        this._size = new_size;
        this._signal_change();
    };
    TypedArray.prototype._set = function (str) {
        if (typeof str === "string") {
            this._set_state(str, {});
            return true;
        }
        if (this._data != str || this._size.length != 1 || this._size[0] != str.length) {
            var B = this.base_type();
            this._data = new B(str);
            this._size = [str.length];
            return true;
        }
        return false;
    };
    TypedArray.prototype._get_index = function (index) {
        if (index.length) {
            var o = 0;
            var m = 1;
            for (var i = 0; i < index.length; i++) {
                o += m * index[i];
                m *= this._size[i];
            }
            return o;
        }
        return index;
    };
    TypedArray.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += "C " + this._server_id + " " + this._get_state() + " ";
    };
    TypedArray.prototype._get_state = function () {
        var res = "";
        res += this._size.length;
        for (var i = 0; i < this._size.length; i++) {
            res += "," + this._size[i];
        }
        for (var i = 0; i < this._data.length; i++) {
            res += "," + this._data[i];
        }
        return res;
    };
    TypedArray.prototype._set_state = function (str, map) {
        var l = str.split(",");
        var s = parseInt(l[0]);
        var size = [];
        for (var i = 0; i < s; i++) {
            size.push(l[i + 1]);
        }
        this._size = size;
        var b = this.base_type();
        var n = this.nb_items();
        this._data = new b(n);
        for (var i = 0; i < n; i++) {
            // @ts-ignore
            this._data[i] = parseFloat(l[s + 1 + i]);
        }
    };
    return TypedArray;
}(Model_1.Model));
exports.TypedArray = TypedArray;
//# sourceMappingURL=TypedArray.js.map