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
var FileSystem_1 = require("../FileSystem/FileSystem");
var Obj_1 = require("./Obj");
var Bool = /** @class */ (function (_super) {
    __extends(Bool, _super);
    function Bool(data) {
        var _this = _super.call(this) || this;
        _this._data = false;
        if (data)
            _this._set(data);
        return _this;
    }
    Bool.prototype.toggle = function () {
        this.set(!this._data);
    };
    Bool.prototype.toBoolean = function () {
        return this._data;
    };
    Bool.prototype.deep_copy = function () {
        return new Bool(this._data);
    };
    Bool.prototype._set = function (value) {
        var n;
        if (value instanceof Bool) {
            n = value.toBoolean();
        }
        else if (value == "false") {
            n = false;
        }
        else if (value == "true") {
            n = true;
        }
        else {
            n = Boolean(value);
        }
        if (this._data !== n) {
            this._data = n;
            return true;
        }
        return false;
    };
    Bool.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        return out.mod += "C " + this._server_id + " " + Number(this._data) + " ";
    };
    return Bool;
}(Obj_1.Obj));
exports.Bool = Bool;
//# sourceMappingURL=Bool.js.map