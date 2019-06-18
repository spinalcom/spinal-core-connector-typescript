"use strict";
exports.__esModule = true;
var ModelProcessManager_1 = require("../ModelProcessManager");
var Directory_1 = require("./Models/Directory");
var DomHelper_1 = require("../DomHelper");
var SpinalCore_1 = require("../SpinalCore");
var root = window ? window : global;
var FileSystem = /** @class */ (function () {
    function FileSystem() {
        this._data_to_send = "";
        this._session_num = -2;
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        FileSystem._insts[this._num_inst] = this;
        if (FileSystem._userid)
            this.send("U " + FileSystem._userid + " " + FileSystem._password + " ");
        this.send("S " + this._num_inst + " ");
    }
    // load object in $path and call $callback with the corresponding model ref
    FileSystem.prototype.load = function (path, callback) {
        FileSystem._send_chan();
        this.send("L " + FileSystem._nb_callbacks + " " + encodeURI(path) + " ");
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        return FileSystem._nb_callbacks++;
    };
    // load all the objects of $type
    FileSystem.prototype.load_type = function (type, callback) {
        FileSystem._send_chan();
        this.send("R 0 " + type + " ");
        return FileSystem._type_callbacks.push([type, callback]);
    };
    // make dir if not already present in the server. Call callback
    // as in the @load proc -- when done (i.e. when loaded or created)
    FileSystem.prototype.load_or_make_dir = function (dir, callback) {
        var _this = this;
        return this.load(dir, function (res, err) {
            var lst, nir, oir, v;
            if (err) {
                if (dir === "/") {
                    return callback(0, err);
                }
                else {
                    lst = (function () {
                        var j, len, ref, results;
                        ref = dir.split('/');
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            v = ref[j];
                            if (v.length) {
                                results.push(v);
                            }
                        }
                        return results;
                    })();
                    nir = lst.pop();
                    oir = "/" + lst.join("/");
                    return _this.load_or_make_dir(oir, function (n_res, n_err) {
                        var n_dir;
                        if (n_err) {
                            return callback(0, n_err);
                        }
                        else {
                            n_dir = new Directory_1.Directory;
                            n_res.add_file(nir, n_dir);
                            return callback(n_dir, n_err);
                        }
                    });
                }
            }
            else {
                return callback(res, err);
            }
        });
    };
    // load an object using is pointer and call $callback with the corresponding ref
    FileSystem.prototype.load_ptr = function (ptr, callback) {
        FileSystem._send_chan();
        this.send("l " + FileSystem._nb_callbacks + " " + ptr + " ");
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        return FileSystem._nb_callbacks++;
    };
    FileSystem.prototype.load_right = function (ptr, callback) {
        FileSystem._send_chan();
        this.send("r " + ptr + " " + FileSystem._nb_callbacks + " ");
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        return FileSystem._nb_callbacks++;
    };
    FileSystem.prototype.share_model = function (ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        return this.send("h " + ptr._server_id + " " + share_type + " " + encodeURI(targetName) +
            (" " + encodeURI(file_name) + " "));
    };
    FileSystem.prototype.send = function (data) {
        this._data_to_send += data;
        if (FileSystem._timer_send == null) {
            return FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
        }
    };
    //send a request for a "push" channel
    FileSystem.prototype.make_channel = function () {
        var path = "";
        if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova)
            if (FileSystem._port) {
                path = "http://" + FileSystem._url + ":" +
                    FileSystem._port + FileSystem.url_com + ("?s=" + this._session_num);
            }
            else {
                path = "http://" + FileSystem._url + FileSystem.url_com + ("?s=" + this._session_num);
            }
        else if (FileSystem.CONNECTOR_TYPE === "Browser") {
            path = FileSystem.url_com + ("?s=" + this._session_num);
        }
        var xhr_object = FileSystem._my_xml_http_request();
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer !== 0)
                    _fs.onConnectionError(0);
                _fs.make_channel_error_timer = 0;
                if (FileSystem._disp) {
                    console.log("chan ->", this.responseText);
                }
                var _w = function (sid, obj) {
                    var _obj, c, j, len, mod_R, ref, results;
                    _obj = FileSystem._create_model_by_name(obj);
                    if ((sid != null) && (_obj != null)) {
                        _obj._server_id = sid;
                        FileSystem._objects[sid] = _obj;
                        ref = FileSystem._type_callbacks;
                        results = [];
                        for (j = 0, len = ref.length; j < len; j++) {
                            c = ref[j];
                            mod_R = root[c[0]] || SpinalCore_1.SpinalCore._def[c[0]];
                            if (_obj instanceof mod_R) {
                                results.push(c[1](_obj));
                            }
                            else {
                                results.push(void 0);
                            }
                        }
                        return results;
                    }
                };
                FileSystem._sig_server = false;
                eval(this.responseText);
                return FileSystem._sig_server = true;
            }
            else if (this.readyState == 4 && this.status == 0) {
                console.error("Disconnected from the server with request : " + path + ".");
                var _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer === 0) {
                    console.log("Trying to reconnect.");
                    _fs.make_channel_error_timer = new Date();
                    setTimeout(_fs.make_channel.bind(_fs), 1000);
                    _fs.onConnectionError(1);
                }
                else {
                    // @ts-ignore
                    if (((new Date()) - _fs.make_channel_error_timer) < FileSystem._timeout_reconnect) {
                        setTimeout(_fs.make_channel.bind(_fs), 1000);
                    }
                    else {
                        _fs.onConnectionError(2);
                    }
                }
            }
            else if (this.readyState == 4 && this.status == 500)
                FileSystem.get_inst().onConnectionError(3);
        };
        return xhr_object.send();
    };
    FileSystem.prototype.onConnectionError = function (error_code) {
        console.error(error_code, this);
        var msg = "";
        if (error_code == 0) {
            if (FileSystem.CONNECTOR_TYPE === "Browser" || FileSystem.isCordova) {
                // @ts-ignore
                FileSystem.popup.hide();
            }
            else
                console.log("Reconnected to the server.");
        }
        else if (error_code == 1) {
            if (FileSystem.CONNECTOR_TYPE === "Browser" || FileSystem.isCordova)
                msg = "Disconnected from the server, trying to reconnect...";
            else
                console.error("Disconnected from the server, trying to reconnect...");
        }
        else if (error_code == 2 || error_code == 3 || error_code == 4) {
            if (FileSystem.CONNECTOR_TYPE === "Browser" || FileSystem.isCordova)
                msg = "Disconnected from the server, please refresh the window.";
            else if (FileSystem.CONNECTOR_TYPE === "Node") {
                console.error("Disconnected from the server.");
                process.exit();
            }
        }
        else
            console.error("Disconnected from the server.");
        if (msg != "") {
            if (FileSystem.popup == 0) {
                FileSystem.popup = new DomHelper_1.new_alert_msg({
                    parent: document.getElementsByTagName("BODY")[0],
                    msg: msg,
                    btn: [{
                            txt: 'reload page',
                            click: window.location.reload.bind(window.location),
                            backgroundColor: '#ff5b57'
                        }, {
                            txt: 'close',
                            backgroundColor: '#348fe2',
                            click: function () {
                                // @ts-ignore
                                FileSystem.popup.hide();
                            }
                        }]
                });
            }
            else {
                // @ts-ignore
                FileSystem.popup.show();
            }
            if (error_code == 2 || error_code == 3 || error_code == 4) {
                // @ts-ignore
                FileSystem.popup.show_btn();
            }
            else {
                // @ts-ignore
                FileSystem.popup.hide_btn();
            }
            // @ts-ignore
            FileSystem.popup.setMsg(msg);
        }
    };
    FileSystem.get_inst = function () {
        for (var key in this._insts) {
            if (this._insts.hasOwnProperty(key))
                return this._insts[key];
        }
        return new FileSystem();
    };
    FileSystem.set_server_id_if_necessary = function (out, obj) {
        if (obj._server_id == null) {
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            var ncl = ModelProcessManager_1.ModelProcessManager.get_object_class(obj);
            if (obj._underlying_fs_type != null) {
                out.mod += "T " + obj._server_id + " " + ncl + " ";
                ncl = obj._underlying_fs_type();
            }
            out.cre += "N " + obj._server_id + " " + ncl + " ";
            return obj._get_fs_data(out);
        }
    };
    FileSystem.signal_change = function (m) {
        if (FileSystem._sig_server) {
            FileSystem._objects_to_send[m.model_id] = m;
            if (FileSystem._timer_chan != null) {
                clearTimeout(FileSystem._timer_chan);
            }
            return FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
        }
    };
    FileSystem._tmp_id_to_real = function (tmp_id, res) {
        var tmp = FileSystem._tmp_objects[tmp_id];
        FileSystem._objects[res] = tmp;
        tmp._server_id = res;
        delete FileSystem._tmp_objects[tmp_id];
        var ptr = FileSystem._ptr_to_update[tmp_id];
        if (ptr != null) {
            delete FileSystem._ptr_to_update[tmp_id];
            ptr.data.value = res;
        }
        if (FileSystem._files_to_upload[tmp_id] != null && tmp.file != null) {
            delete FileSystem._files_to_upload[tmp_id];
            // send the file
            var fs = FileSystem.get_inst();
            var path = "";
            if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova) {
                if (FileSystem._port) {
                    path = "http://" + FileSystem._url + ":" + FileSystem._port + FileSystem.url_com + ("?s=" + fs._session_num + "&p=" + tmp._server_id);
                }
                else {
                    path = "http://" + FileSystem._url + FileSystem.url_com + ("?s=" + fs._session_num + "&p=" + tmp._server_id);
                }
            }
            else if (FileSystem.CONNECTOR_TYPE === "Browser") {
                path = FileSystem.url_com + ("?s=" + fs._session_num + "&p=" + tmp._server_id);
            }
            var xhr_object = FileSystem._my_xml_http_request();
            xhr_object.open('PUT', path, true);
            xhr_object.onreadystatechange = function () {
                var _w;
                if (this.readyState === 4 && this.status === 200) {
                    _w = function (sid, obj) {
                        var _obj = FileSystem._create_model_by_name(obj);
                        if ((sid != null) && (_obj != null)) {
                            _obj._server_id = sid;
                            return FileSystem._objects[sid] = _obj;
                        }
                    };
                    return eval(this.responseText);
                }
            };
            xhr_object.send(tmp.file);
            delete tmp.file;
        }
        return FileSystem.signal_change(FileSystem._objects[res]);
    };
    FileSystem._create_model_by_name = function (name) {
        if (typeof name !== "string") {
            return name;
        }
        if (typeof SpinalCore_1.SpinalCore._def[name] !== "undefined")
            return new SpinalCore_1.SpinalCore._def[name]();
        if (typeof root[name] === 'undefined') {
            if (FileSystem.debug === true) {
                console.warn("Got Model type \"" + name + "\" from hub but not registered.");
            }
            root[name] = new Function("return class " + name + " extends spinalCore._def[\"Model\"] {}")();
        }
        return new root[name]();
    };
    FileSystem.extend = function () {
        console.warn("deprecated use class extend instead");
    };
    FileSystem._get_new_tmp_server_id = function () {
        FileSystem._cur_tmp_server_id++;
        if (FileSystem._cur_tmp_server_id % 4 === 0)
            FileSystem._cur_tmp_server_id++;
        return FileSystem._cur_tmp_server_id;
    };
    // send changes
    FileSystem._send_chan = function () {
        var res = [];
        var out = FileSystem._get_chan_data();
        for (var k in FileSystem._insts)
            res.push(FileSystem._insts[k].send(out));
        return res;
    };
    FileSystem._timeout_chan_func = function () {
        FileSystem._send_chan();
        delete FileSystem._timer_chan;
    };
    FileSystem._get_chan_data = function () {
        var out = { cre: "", mod: "" };
        for (var key in FileSystem._objects_to_send) {
            FileSystem._objects_to_send[key]._get_fs_data(out);
        }
        FileSystem._objects_to_send = {};
        return out.cre + out.mod;
    };
    FileSystem._timeout_send_func = function () {
        var f, k, out, path, ref, ref1, xhr_object;
        // if some model have changed, we have to send the changes now
        out = FileSystem._get_chan_data();
        ref = FileSystem._insts;
        for (k in ref) {
            f = ref[k];
            f._data_to_send += out;
        }
        ref1 = FileSystem._insts;
        // send data
        for (k in ref1) {
            f = ref1[k];
            if (!f._data_to_send.length) {
                continue;
            }
            // if we are waiting for a session id, do not send the data
            // (@responseText will contain another call to @_timeout_send with the session id)
            if (f._session_num === -1) {
                continue;
            }
            // for first call, do not add the session id (but say that we are waiting for one)
            if (f._session_num === -2) {
                f._session_num = -1;
            }
            else {
                f._data_to_send = "s " + f._session_num + " " + f._data_to_send;
            }
            // request
            path = "";
            if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova) {
                if (FileSystem._port) {
                    path = "http://" + FileSystem._url + ":" + FileSystem._port + FileSystem.url_com;
                }
                else {
                    path = "http://" + FileSystem._url + FileSystem.url_com;
                }
            }
            else if (FileSystem.CONNECTOR_TYPE === "Browser") {
                path = FileSystem.url_com;
            }
            xhr_object = FileSystem._my_xml_http_request();
            xhr_object.open('POST', path, true);
            xhr_object.onreadystatechange = function () {
                var _c, _w, c, j, len, results;
                if (this.readyState === 4 && this.status === 200) {
                    if (FileSystem._disp) {
                        console.log("resp ->", this.responseText);
                    }
                    _c = []; // callbacks
                    _w = function (sid, obj) {
                        var _obj, c, j, len, mod_R, ref2, results;
                        _obj = FileSystem._create_model_by_name(obj);
                        if ((sid != null) && (_obj != null)) {
                            _obj._server_id = sid;
                            FileSystem._objects[sid] = _obj;
                            ref2 = FileSystem._type_callbacks;
                            results = [];
                            for (j = 0, len = ref2.length; j < len; j++) {
                                c = ref2[j];
                                mod_R = root[c[0]] || SpinalCore_1.SpinalCore._def[c[0]];
                                if (_obj instanceof mod_R) {
                                    results.push(c[1](_obj));
                                }
                                else {
                                    results.push(void 0);
                                }
                            }
                            return results;
                        }
                    };
                    FileSystem._sig_server = false;
                    eval(this.responseText);
                    FileSystem._sig_server = true;
                    results = [];
                    for (j = 0, len = _c.length; j < len; j++) {
                        c = _c[j];
                        results.push(FileSystem._callbacks[c[0]](FileSystem._objects[c[1]], c[2]));
                    }
                    return results;
                }
                else if (this.readyState === 4 && (this.status === 0 || this.status === 500)) {
                    return FileSystem.get_inst().onConnectionError(4);
                }
            };
            if (FileSystem._disp) {
                console.log("sent ->", f._data_to_send + "E ");
            }
            xhr_object.setRequestHeader('Content-Type', 'text/plain');
            xhr_object.send(f._data_to_send + "E ");
            //console.log "-> ", f._data_to_send
            f._data_to_send = "";
        }
        FileSystem._objects_to_send = {};
        return delete FileSystem._timer_send;
    };
    FileSystem._my_xml_http_request = function () {
        if (FileSystem.CONNECTOR_TYPE === "Browser") {
            // @ts-ignore
            if (window.XMLHttpRequest)
                return new XMLHttpRequest();
            // @ts-ignore
            if (window.ActiveXObject) {
                // @ts-ignore
                return new ActiveXObject('Microsoft.XMLHTTP');
            }
            alert('Your browser does not seem to support XMLHTTPRequest objects...');
        }
        else if (FileSystem.CONNECTOR_TYPE === "Node")
            return new FileSystem._XMLHttpRequest();
        else
            console.log("you must define CONNECTOR_TYPE");
    };
    FileSystem.popup = 0;
    FileSystem.debug = false;
    FileSystem._cur_tmp_server_id = 0;
    FileSystem._sig_server = true; // if changes has to be sent
    FileSystem._disp = false;
    FileSystem._userid = "644";
    FileSystem._timeout_reconnect = 30000;
    FileSystem.isCordova = false;
    FileSystem._objects_to_send = {};
    FileSystem._timer_send = undefined;
    FileSystem._timer_chan = undefined;
    FileSystem._nb_callbacks = 0;
    FileSystem._callbacks = {};
    FileSystem._type_callbacks = [];
    FileSystem._nb_insts = 0;
    FileSystem._insts = {};
    FileSystem._files_to_upload = {};
    FileSystem._ptr_to_update = {};
    FileSystem._tmp_objects = {};
    FileSystem._objects = {};
    FileSystem._url = "127.0.0.1";
    FileSystem._port = "8888";
    FileSystem.url_com = "/sceen/_";
    FileSystem.url_upload = "/sceen/upload";
    FileSystem.CONNECTOR_TYPE = "";
    FileSystem._home_dir = "";
    return FileSystem;
}());
exports.FileSystem = FileSystem;
//# sourceMappingURL=FileSystem.js.map