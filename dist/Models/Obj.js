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
var Obj = /** @class */ (function (_super) {
    __extends(Obj, _super);
    function Obj(data) {
        var _this = _super.call(this) || this;
        if (data) {
            _this._set(data);
        }
        return _this;
    }
    Obj.prototype.toString = function () {
        return this._data != null ? this._data.toString() : void 0;
    };
    Obj.prototype.equals = function (obj) {
        if (obj instanceof Obj) {
            return this._data == obj._data;
        }
        return this._data == obj;
    };
    Obj.prototype.get = function () {
        return this._data;
    };
    Obj.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += "C " + this._server_id + " " + this.toString() + " ";
    };
    Obj.prototype._set = function (value) {
        if (this._data != value) {
            this._data = value;
            return true;
        }
        return false;
    };
    Obj.prototype._get_state = function () {
        console.warn("get_state deprecated");
        return this._data.toString();
    };
    Obj.prototype._set_state = function (str, map) {
        this.set(str);
    };
    return Obj;
}(Model_1.Model));
exports.Obj = Obj;
//# sourceMappingURL=Obj.js.map