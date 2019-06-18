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
var Lst_1 = require("../../Models/Lst");
var TiffFile_1 = require("./TiffFile");
var File_1 = require("./File");
var Directory = /** @class */ (function (_super) {
    __extends(Directory, _super);
    function Directory() {
        return _super.call(this) || this;
    }
    Directory.prototype.base_type = function () {
        return File_1.File;
    };
    Directory.prototype.find = function (name) {
        for (var i = 0; i < this.length; i++) {
            var file = this[i];
            if (file.hasOwnProperty('name') && file.name.equals(name))
                return file;
        }
        return undefined;
    };
    Directory.prototype.load = function (name, callback) {
        var f = this.find(name);
        if (f)
            f.load(callback);
        else
            callback(undefined, "file does not exist");
    };
    Directory.prototype.has = function (name) {
        for (var i = 0; i < this.length; i++) {
            var file = this[i];
            if (file.name.equals(name))
                return true;
        }
        return false;
    };
    Directory.prototype.add_file = function (name, obj, params) {
        if (params === void 0) { params = {}; }
        var f = this.find(name);
        if (f)
            return f;
        var res = new File_1.File(name, obj, params);
        this.push(res);
        return res;
    };
    Directory.prototype.add_tiff_file = function (name, obj, tiff_obj, params) {
        if (params === void 0) { params = {}; }
        var f = this.find(name);
        if (f)
            return f;
        var res = new TiffFile_1.TiffFile(name, obj, tiff_obj, params);
        this.push(res);
        return res;
    };
    Directory.prototype.force_add_file = function (name, obj, params) {
        if (params === void 0) { params = {}; }
        var num = 0;
        var filename = name;
        var f = this.find(filename);
        while (f) {
            filename = name + "_" + num;
            f = this.find(filename);
            if (f)
                num++;
        }
        var res = new File_1.File(filename, obj, params);
        this.push(res);
        return res;
    };
    Directory.prototype.get_file_info = function (info) {
        return info.icon = "folder";
    };
    return Directory;
}(Lst_1.Lst));
exports.Directory = Directory;
//# sourceMappingURL=Directory.js.map