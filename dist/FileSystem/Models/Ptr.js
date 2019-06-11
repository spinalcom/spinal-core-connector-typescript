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
Object.defineProperty(exports, "__esModule", { value: true });
const Model_1 = require("../../Models/Model");
const FileSystem_1 = require("../FileSystem");
class Ptr extends Model_1.Model {
    constructor(model) {
        super();
        this._set(model);
    }
    load(callback) {
        if (this.data.model)
            callback(this.data.model, false);
        else if (FileSystem_1.FileSystem.hasOwnProperty('get_inst') && FileSystem_1.FileSystem.get_inst() !== null)
            FileSystem_1.FileSystem.get_inst().load_ptr(this.data.value, callback);
    }
    _get_fs_data(out) {
        FileSystem_1.FileSystem.set_server_id_if_necessary(out, this);
        if (this.data.hasOwnProperty('model') && this.data.model !== null) {
            FileSystem_1.FileSystem.set_server_id_if_necessary(out, this.data.model);
            out.mod += `C ${this._server_id} ${this.data.model._server_id}`;
            this.data.value = this.data.model._server_id;
            if (this.data.model._server_id & 3)
                FileSystem_1.FileSystem._ptr_to_update[this.data.model._server_id] = this;
        }
        else
            return out.mod += `C ${this._server_id} ${this.data.value}`;
    }
    _set(model) {
        let res;
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
    }
    _get_state() {
        console.warn("deprecated use of _get_state in Ptr");
        // @ts-ignore
        return this._data;
    }
    _set_state(str, map) {
        this.set(str);
    }
}
exports.Ptr = Ptr;
//# sourceMappingURL=Ptr.js.map