"use strict";
exports.__esModule = true;
var url = require("url");
var FileSystem_1 = require("./FileSystem/FileSystem");
var SpinalUserManager = /** @class */ (function () {
    function SpinalUserManager() {
    }
    SpinalUserManager.get_user_id = function (options, user_name, password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: /get_user_id?u=<user>&p=<password>
        get_cmd = '/get_user_id?u=' + user_name + '&p=' + password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_user_id', response);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_user_id', status);
        });
    };
    SpinalUserManager.get_admin_id = function (options, admin_name, password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: /get_user_id?u=<user>&p=<password>
        get_cmd = '/get_admin_id?u=' + admin_name + '&p=' + password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_admin_id', response);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_admin_id', status);
        });
    };
    SpinalUserManager.new_account = function (options, user_name, password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: /get_new_account?e=<user>&p=<password>&cp=<confirm_password>
        get_cmd = '/get_new_account?e=' + user_name + '&p=' + password + '&cp=' + password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_new_account', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_new_account', status);
        });
    };
    SpinalUserManager.change_password = function (options, user_id, password, new_password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: /get_change_user_password?e=<user>&op=<old_pass>&np=<newpass>&cp=<confim_pass>
        get_cmd = '/get_change_user_password?e=' + user_id + '&op=' + password + '&np=' + new_password + '&cp=' + new_password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_change_user_password', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_change_user_password', status);
        });
    };
    SpinalUserManager.delete_account = function (options, user_id, password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        // Access: /get_delete_account?e=<user>&i=<id>&p=<password>
        // @ts-ignore
        var get_cmd = '/get_delete_account?&i=' + user_id + '&p=' + password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_delete_account', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_delete_account', status);
        });
    };
    SpinalUserManager.change_password_by_admin = function (options, username, password, admin_id, admin_password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: ?u=<username>&np=<newpass>&a=<admin_id>&ap=<adminPass>
        // admin == 644(root) or 168(admin)
        get_cmd = '/get_change_user_password_by_admin?u=' + username + '&np=' + password + '&a=' + admin_id + '&ap=' + admin_password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_change_user_password_by_admin', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_change_user_password_by_admin', status);
        });
    };
    SpinalUserManager.delete_account_by_admin = function (options, username, admin_id, admin_password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: /get_delete_account_by_admin?u=<username>&a=<admin_id>&ap=<adminPassword>
        // admin == 644(root) or 168(admin)
        get_cmd = '/get_delete_account_by_admin?u=' + username + '&a=' + admin_id + '&ap=' + admin_password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_delete_account_by_admin', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_delete_account_by_admin', status);
        });
    };
    SpinalUserManager.change_account_rights_by_admin = function (options, username, right, admin_id, admin_password, success_callback, error_callback) {
        if (error_callback === void 0) { error_callback = null; }
        var get_cmd;
        // Access: ?u=<username>&ri=<rights>&a=<admin_id>&ap=<adminPass>
        // admin == 644(root) or 168(admin)
        get_cmd = '/get_change_account_rights_by_admin?u=' + username + '&ri=' + right + '&a=' + admin_id + '&ap=' + admin_password;
        return this.send_xhr(options, get_cmd, function (response) {
            if (parseInt(response) === -1) {
                return SpinalUserManager._if_error(error_callback, 'get_change_account_rights_by_admin', status);
            }
            else {
                return success_callback(response);
            }
        }, function (status) {
            return SpinalUserManager._if_error(error_callback, 'get_change_account_rights_by_admin', status);
        });
    };
    SpinalUserManager.send_xhr = function (options, get_cmd, success_callback, error_callback) {
        var path, xhr_object;
        path = "";
        if (typeof options === 'string') {
            options = url.parse(options);
        }
        FileSystem_1.FileSystem._url = options.hostname;
        FileSystem_1.FileSystem._port = options.port;
        if (FileSystem_1.FileSystem.CONNECTOR_TYPE === "Node" || FileSystem_1.FileSystem.isCordova) {
            if (FileSystem_1.FileSystem._port) {
                path = "http://" + FileSystem_1.FileSystem._url + ":" + FileSystem_1.FileSystem._port + get_cmd;
            }
            else {
                path = "http://" + FileSystem_1.FileSystem._url + get_cmd;
            }
        }
        else if (FileSystem_1.FileSystem.CONNECTOR_TYPE === "Browser") {
            path = get_cmd;
        }
        xhr_object = FileSystem_1.FileSystem._my_xml_http_request();
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                return success_callback(this.responseText);
            }
            else if (this.readyState === 4) {
                return error_callback(this.status);
            }
        };
        return xhr_object.send();
    };
    SpinalUserManager._if_error = function (error_callback, fun, response) {
        if (error_callback !== null) {
            return error_callback(response);
        }
        else {
            return console.log('Error on ' + fun + ' and the error_callback was not set.');
        }
    };
    return SpinalUserManager;
}());
exports.SpinalUserManager = SpinalUserManager;
//# sourceMappingURL=SpinalUserManager.js.map