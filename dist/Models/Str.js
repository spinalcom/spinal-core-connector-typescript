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
var Obj_1 = require("./Obj");
var FileSystem_1 = require("../FileSystem/FileSystem");
var Str = /** @class */ (function (_super) {
    __extends(Str, _super);
    function Str(data) {
        var _this = _super.call(this) || this;
        _this._data = "";
        _this.length = 0;
        if (data)
            _this._set(data);
        return _this;
    }
    Str.prototype.toggle = function (str, space) {
        if (space === void 0) { space = " "; }
        var l = this._data.split(space);
        var i = l.indexOf(str);
        if (i < 0)
            l.push(str);
        else
            l.splice(i, 1);
        this.set(l.join(" "));
    };
    Str.prototype.contains = function (str) {
        return this._data.indexOf(str) !== -1;
    };
    Str.prototype.equals = function (str) {
        return this._data === str.toString();
    };
    Str.prototype.ends_with = function (str) {
        var l = this._data.match(str + "$");
        return typeof l !== "undefined" && l[0] === str;
    };
    Str.prototype.deep_copy = function () {
        return new Str(this._data);
    };
    Str.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += "C " + this._server_id + " " + encodeURI(this._data) + " ";
    };
    Str.prototype._set = function (value) {
        if (typeof value == "undefined") {
            return this._set("");
        }
        var n = value.toString();
        if (this._data !== n) {
            this._data = n;
            this.length = this._data.length;
            return true;
        }
        return false;
    };
    Str.prototype._get_state = function () {
        return encodeURI(this._data);
    };
    Str.prototype._set_state = function (str, map) {
        this.set(decodeURIComponent(str));
    };
    return Str;
}(Obj_1.Obj));
exports.Str = Str;
//# sourceMappingURL=Str.js.map