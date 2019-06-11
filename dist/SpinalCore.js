"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileSystem_1 = require("./FileSystem/FileSystem");
const url = require("url");
class SpinalCore {
    constructor() {
        this.version = "2.5.0";
    }
    static connect(options) {
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
            let auth = options.auth.split(":");
            FileSystem_1.FileSystem._userid = auth[0];
            if (auth.length > 1)
                FileSystem_1.FileSystem._password = auth[1];
        }
        else {
            FileSystem_1.FileSystem._userid = "644";
            FileSystem_1.FileSystem._password = "";
        }
        return new FileSystem_1.FileSystem();
    }
    static store(fs, model, path, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = () => {
                console.log("Model could not be stored. You can pass a callback to handle this error.");
            };
        let lst = path.split('/');
        let fileName = lst.pop();
        if (lst[0] === "") {
            lst.splice(0, 1);
        }
        path = lst.join("/");
        fs.load_or_make_dir(FileSystem_1.FileSystem._home_dir + path, (dir, err) => {
            if (err)
                callback_error(err);
            else {
                let file = dir.detect((x) => { return x.name.get() === fileName; });
                if (file) {
                    dir.remove(file);
                }
                dir.add_file(fileName, model, { model_type: "Model" });
                callback_success();
            }
        });
    }
    static register_models(models) {
        if (models) {
            if (models instanceof Function) {
                SpinalCore.register_models_check(models);
            }
            else if (models instanceof Array) {
                for (let i = 0; i < models.length; i++) {
                    SpinalCore.register_models_check(models[i]);
                }
            }
            else {
                for (let key in models) {
                    if (models.hasOwnProperty(key))
                        SpinalCore.register_models_check(models[key]);
                }
            }
        }
    }
    static register_models_check(func) {
        if (typeof SpinalCore._def[func.name] != 'undefined' && SpinalCore._def[func.name] != func) {
            console.warn("trying to register \"#{func.name}\" Model but was" +
                " already defined");
            console.warn("old =", SpinalCore._def[func.name]);
            console.warn("new =", func);
        }
        SpinalCore._def[func.name] = func;
    }
    static load(fs, path, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = () => {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        let lst = path.split("/");
        let file_name = lst.pop();
        if (lst[0] == "")
            lst.splice(0, 1);
        path = lst.join("/"); //Absolute paths are not allowed
        fs.load_or_make_dir(FileSystem_1.FileSystem._home_dir + path, (current_dir, err) => {
            if (err)
                callback_error(err);
            else {
                let file = current_dir.detect((x) => {
                    return x.name.get() === file_name;
                });
                if (file)
                    file.load((data, err) => {
                        if (err)
                            callback_error(err);
                        else
                            callback_success(data, err);
                    });
                else
                    callback_error();
            }
        });
    }
    static load_type(fs, type, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = () => {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        fs.load_type(type, (data, err) => {
            if (err)
                callback_error(err);
            else
                callback_success(data, err);
        });
    }
    static load_right(fs, ptr, callback_success, callback_error) {
        if (typeof callback_error === "undefined")
            callback_error = () => {
                console.log("Model Right could not be loaded." +
                    " You can pass a callback to handle this error.");
            };
        fs.load_right(ptr, (data, err) => {
            if (err)
                callback_error(err);
            else
                callback_success(data, err);
        });
    }
    static share_model(fs, ptr, file_name, right_flags, targetName) {
        return fs.share_model(ptr, file_name, right_flags, targetName);
    }
    static right_flags() {
        return { AD: 1, WR: 2, RD: 4 };
    }
    static extend() {
        console.warn("deprecated used of extend. use class extend instead");
    }
}
SpinalCore._def = {};
exports.SpinalCore = SpinalCore;
//# sourceMappingURL=SpinalCore.js.map