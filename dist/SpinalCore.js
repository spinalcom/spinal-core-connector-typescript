"use strict";
exports.__esModule = true;
var FileSystem_1 = require("./FileSystem/FileSystem");
var url = require("url");
var SpinalCore = /** @class */ (function () {
    function SpinalCore() {
        this.version = "2.5.0";
    }
    SpinalCore.connect = function (options) {
        if (typeof options === "string") {
            options = url.parse(options);
        }
        if (options.path.slice(-1)[0] !== "/") {
            options.path += "/";
        }
        FileSystem_1.FileSystem._home_dir = options.path;
        FileSystem_1.FileSystem._url = options.hostname;
        FileSystem_1.FileSystem._port = options.portl;
        if (options.auth != null) {
            var auth = options.auth.split(":");
            FileSystem_1.FileSystem._userid = auth[0];
            if (auth.length > 1)
                FileSystem_1.FileSystem._password = auth[1];
        }
        else {
            FileSystem_1.FileSystem._userid = "644";
            FileSystem_1.FileSystem._password = "";
        }
        return new FileSystem_1.FileSystem();
    };
    SpinalCore.store = function (fs, model, path, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = function () {
                console.log("Model could not be stored. You can pass a callback to handle this error.");
            };
        var lst = path.split('/');
        var fileName = lst.pop();
        if (lst[0] === "") {
            lst.splice(0, 1);
        }
        path = lst.join("/");
        fs.load_or_make_dir(FileSystem_1.FileSystem._home_dir + path, function (dir, err) {
            if (err)
                callback_error(err);
            else {
                var file = dir.detect(function (x) { return x.name.get() === fileName; });
                if (file) {
                    dir.remove(file);
                }
                dir.add_file(fileName, model, { model_type: "Model" });
                callback_success();
            }
        });
    };
    SpinalCore.register_models = function (models) {
        if (models) {
            if (models instanceof Function) {
                SpinalCore.register_models_check(models);
            }
            else if (models instanceof Array) {
                for (var i = 0; i < models.length; i++) {
                    SpinalCore.register_models_check(models[i]);
                }
            }
            else {
                for (var key in models) {
                    if (models.hasOwnProperty(key))
                        SpinalCore.register_models_check(models[key]);
                }
            }
        }
    };
    SpinalCore.register_models_check = function (func) {
        if (typeof SpinalCore._def[func.name] != 'undefined' && SpinalCore._def[func.name] != func) {
            console.warn("trying to register \"#{func.name}\" Model but was" +
                " already defined");
            console.warn("old =", SpinalCore._def[func.name]);
            console.warn("new =", func);
        }
        SpinalCore._def[func.name] = func;
    };
    SpinalCore.load = function (fs, path, callback_success, callback_error) {
        if (typeof callback_error === "undefined") {
            callback_error = function () {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        }
        var lst = path.split("/");
        var file_name = lst.pop();
        if (lst[0] == "")
            lst.splice(0, 1);
        path = lst.join("/"); //Absolute paths are not allowed
        return fs.load_or_make_dir(FileSystem_1.FileSystem._home_dir + path, function (current_dir, err) {
            if (err) {
                console.error(err);
                callback_error();
            }
            else {
                var file = current_dir.detect(function (x) {
                    return x.name.get() === file_name;
                });
                if (file) {
                    file.load(function (data, err) {
                        if (err) {
                            console.error(err);
                            callback_error(err);
                        }
                        else
                            callback_success(data, err);
                    });
                }
                else
                    callback_error();
            }
        });
    };
    SpinalCore.load_type = function (fs, type, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = function () {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        fs.load_type(type, function (data, err) {
            if (err)
                callback_error(err);
            else
                callback_success(data, err);
        });
    };
    SpinalCore.load_right = function (fs, ptr, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = function () {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        fs.load_right(ptr, function (data, err) {
            if (err)
                callback_error(err);
            else
                callback_success(data, err);
        });
    };
    SpinalCore.share_model = function (fs, ptr, file_name, right_flags, targetName) {
        return fs.share_model(ptr, file_name, right_flags, targetName);
    };
    SpinalCore.right_flags = function () {
        return { AD: 1, WR: 2, RD: 4 };
    };
    SpinalCore.extend = function () {
        console.warn("deprecated used of extend. use class extend instead");
    };
    SpinalCore._def = {};
    return SpinalCore;
}());
exports.SpinalCore = SpinalCore;
//# sourceMappingURL=SpinalCore.js.map