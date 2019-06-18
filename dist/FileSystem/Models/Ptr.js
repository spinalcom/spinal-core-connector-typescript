"use strict";
/*
 *  Copyright (c) 2019 SpinalCom - www.spinalcom.com
 * This file is part of SpinalCore.
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
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
var Model_1 = require("../../Models/Model");
var FileSystem_1 = require("../FileSystem");
var Ptr = /** @class */ (function (_super) {
    __extends(Ptr, _super);
    function Ptr(model) {
        var _this = _super.call(this) || this;
        _this.data = {};
        _this._set(model);
        return _this;
    }
    Ptr.prototype.load = function (callback) {
        if (this.data.model)
            callback(this.data.model, false);
        else if (FileSystem_1.FileSystem.get_inst() !== null)
            FileSystem_1.FileSystem.get_inst().load_ptr(this.data.value, callback);
    };
    Ptr.prototype._get_fs_data = function (out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        if (this.data.hasOwnProperty('model') && this.data.model !== null) {
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, this.data.model);
            out.mod += "C " + this._server_id + " " + this.data.model._server_id + " ";
            this.data.value = this.data.model._server_id;
            if (this.data.model._server_id & 3)
                FileSystem_1.FileSystem._ptr_to_update[this.data.model._server_id] = this;
        }
        else
            return out.mod += "C " + this._server_id + " " + this.data.value + " ";
    };
    Ptr.prototype._set = function (model) {
        var res;
        if (typeof model === "number") {
            res = this.data.value !== model;
            this.data = { value: model };
            return res;
        }
        if (model instanceof Model_1.Model) {
            res = this.data.value !== model._server_id;
            this.data = {
                model: model,
                value: model._server_id
            };
            return res;
        }
        return false;
    };
    Ptr.prototype._get_state = function () {
        console.warn("deprecated use of _get_state in Ptr");
        // @ts-ignore
        return this._data;
    };
    Ptr.prototype._set_state = function (str, map) {
        this.set(str);
    };
    return Ptr;
}(Model_1.Model));
exports.Ptr = Ptr;
//# sourceMappingURL=Ptr.js.map