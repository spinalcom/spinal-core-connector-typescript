"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ModelProcessManager_1 = require("../ModelProcessManager");
const Directory_1 = require("./Models/Directory");
const DomHelper_1 = require("../DomHelper");
const SpinalCore_1 = require("../SpinalCore");
class FileSystem {
    constructor() {
        this._data_to_send = "";
        this._session_num = -2;
        this._num_inst = FileSystem._nb_insts++;
        this.make_channel_error_timer = 0;
        FileSystem._insts[this._num_inst] = this;
        if (FileSystem._userid)
            this.send(`U ${FileSystem._userid} ${FileSystem._password} `);
        this.send(`S ${this._num_inst} `);
    }
    //load object in $path and call $callback with the corresponding model ref
    load(path, callback) {
        FileSystem._send_chan();
        this.send(`L ${FileSystem._nb_callbacks} ${encodeURI(path)} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    //load all the objects of $type
    load_type(type, callback) {
        FileSystem._send_chan();
        this.send(`R 0 ${type} `);
        FileSystem._type_callbacks.push([type, callback]);
    }
    // make dir if not already present in the server. Call callback
    // as in the @load proc -- when done (i.e. when loaded or created)
    load_or_make_dir(dir, callback) {
        this.load(dir, (res, err) => {
            if (err)
                if (dir == "/")
                    callback(0, err);
                else {
                    const lst = dir.split('/')
                        .reduce((accu, v) => {
                        if (v.length > 0)
                            accu.push(v);
                        return accu;
                    }, []);
                    const nir = lst.pop();
                    let oir = "/" + lst.join("/");
                    this.load_or_make_dir(oir, (n_res, n_err) => {
                        if (n_err)
                            callback(0, n_err);
                        else {
                            const n_dir = new Directory_1.Directory();
                            n_res.add_file(nir, n_dir);
                            callback(n_dir, n_err);
                        }
                    });
                }
            else
                callback(res, err);
        });
    }
    // load an object using is pointer and call $callback with the corresponding ref
    load_ptr(ptr, callback) {
        FileSystem._send_chan();
        this.send(`l ${FileSystem._nb_callbacks} ${ptr}`);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    load_right(ptr, callback) {
        FileSystem._send_chan();
        this.send(`r ${ptr} ${FileSystem._nb_callbacks} `);
        FileSystem._callbacks[FileSystem._nb_callbacks] = callback;
        FileSystem._nb_callbacks++;
    }
    share_model(ptr, file_name, share_type, targetName) {
        FileSystem._send_chan();
        // @ts-ignore
        this.send(`h ${ptr._server_id} ${share_type} ${encodeURI(targetName)}` +
            ` ${encodeURI(file_name)} `);
    }
    send(data) {
        this._data_to_send += data;
        if (!FileSystem._timer_send)
            FileSystem._timer_send = setTimeout(FileSystem._timeout_send_func, 1);
    }
    //send a request for a "push" channel
    make_channel() {
        let path = "";
        if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova)
            if (FileSystem._port) {
                path = "http://" + FileSystem._url + ":" +
                    FileSystem._port + FileSystem.url_com + "?s=#{@_session_num}";
            }
            else {
                path = "http://" + FileSystem._url + FileSystem.url_com + "?s=#{@_session_num}";
            }
        else if (FileSystem.CONNECTOR_TYPE == "Browser") {
            path = FileSystem.url_com + "?s=#{@_session_num}";
        }
        let xhr_object = FileSystem._my_xml_http_request();
        xhr_object.open('GET', path, true);
        xhr_object.onreadystatechange = () => {
            if (this.readyState === 4 && this.status === 200) {
                const _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer != 0)
                    _fs.onConnectionError(0);
                _fs.make_channel_error_timer = 0;
                if (FileSystem._disp) {
                    console.log("chan ->", this.responseText);
                }
                let _w = (sid, obj) => {
                    let _obj = FileSystem._create_model_by_name(obj);
                    if (typeof sid !== "undefined" && typeof _obj !== "undefined") {
                        _obj._server_id = sid;
                        FileSystem._objects[sid] = _obj;
                        for (let c of FileSystem._type_callbacks) {
                            let mod_R = SpinalCore_1.SpinalCore._def[c[0]];
                            if (_obj instanceof mod_R)
                                c[1](_obj);
                        }
                    }
                };
                FileSystem._sig_server = false;
                eval(this.responseText);
                FileSystem._sig_server = true;
            }
            else if (this.readyState == 4 && this.status == 0) {
                console.error(`Disconnected from the server with request : ${path}.`);
                let _fs = FileSystem.get_inst();
                if (_fs.make_channel_error_timer == 0) {
                    console.log("Trying to reconnect.");
                    _fs.make_channel_error_timer = new Date();
                    setTimeout(_fs.make_channel.bind(_fs), 1000);
                    _fs.onConnectionError(1);
                }
                else { // @ts-ignore
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
        xhr_object.send();
    }
    onConnectionError(error_code) {
        let msg = "";
        if (error_code == 0) {
            if (FileSystem.CONNECTOR_TYPE == "Browser" || FileSystem.isCordova) {
                // @ts-ignore
                FileSystem.popup.hide();
            }
            else
                console.log("Reconnected to the server.");
        }
        else if (error_code == 1) {
            if (FileSystem.CONNECTOR_TYPE == "Browser" || FileSystem.isCordova)
                msg = "Disconnected from the server, trying to reconnect...";
            else
                console.error("Disconnected from the server, trying to reconnect...");
        }
        else if (error_code == 2 || error_code == 3 || error_code == 4) {
            if (FileSystem.CONNECTOR_TYPE == "Browser" || FileSystem.isCordova)
                msg = "Disconnected from the server, please refresh the window.";
            else if (FileSystem.CONNECTOR_TYPE == "Node") {
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
                            click: () => {
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
    }
    static get_inst() {
        for (let key in this._insts) {
            if (this._insts.hasOwnProperty(key))
                return this._insts[key];
        }
        return new FileSystem();
    }
    static set_server_id_if_necessary(out, obj) {
        if (obj.hasOwnProperty("_server_id") && obj._server_id) {
            obj._server_id = FileSystem._get_new_tmp_server_id();
            FileSystem._tmp_objects[obj._server_id] = obj;
            let ncl = ModelProcessManager_1.ModelProcessManager.get_object_class(obj);
            if (obj.hasOwnProperty('_underlying_fs_type') && obj._underlying_fs_type !== null) {
                out.mod += `T ${obj._server_id} ${ncl}`;
                ncl = obj._underlying_fs_type();
            }
            out.cre += `N ${obj._server_id} ${ncl}`;
            return obj._get_fs_data(out);
        }
    }
    static signal_change(m) {
        if (FileSystem._sig_server) {
            FileSystem._objects_to_send[m.model_id] = m;
            if (FileSystem._timer_chan) {
                clearTimeout(FileSystem._timer_chan);
            }
            FileSystem._timer_chan = setTimeout(FileSystem._timeout_chan_func, 250);
        }
    }
    static _tmp_id_to_real(tmp_id, res) {
        let tmp = FileSystem._tmp_objects[tmp_id];
        if (tmp === null) {
            console.log(tmp_id);
        }
        FileSystem._objects[res] = tmp;
        tmp._server_id = res;
        delete FileSystem._tmp_objects[tmp_id];
        let ptr = FileSystem._ptr_to_update[tmp_id];
        if (ptr) {
            delete FileSystem._ptr_to_update[tmp_id];
            ptr.data.value = res;
        }
        if (FileSystem._files_to_upload[tmp_id] && tmp.file) {
            delete FileSystem._files_to_upload[tmp_id];
            let fs = FileSystem.get_inst();
            let path = "";
            if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova) {
                if (FileSystem._port) {
                    path = "http://" + FileSystem._url + ":" + FileSystem._port + FileSystem.url_com + `?s=${fs._session_num}&p=${tmp._server_id}`;
                }
                else {
                    path = "http://" + FileSystem._url + FileSystem.url_com + `?s=${fs._session_num}&p=${tmp._server_id}`;
                }
            }
            else if (FileSystem.CONNECTOR_TYPE === "Browser") {
                path = FileSystem.url_com + `?s=${fs._session_num}&p=${tmp._server_id}`;
            }
            let xhr_object = FileSystem._my_xml_http_request();
            xhr_object.open('PUT', path, true);
            xhr_object.onreadystatechange = function () {
                var _w;
                if (this.readyState === 4 && this.status === 200) {
                    _w = function (sid, obj) {
                        var _obj;
                        _obj = FileSystem._create_model_by_name(obj);
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
    }
    static _create_model_by_name(name) {
        if (typeof name !== "string") {
            return name;
        }
        if (typeof SpinalCore_1.SpinalCore._def[name] !== "undefined")
            return new SpinalCore_1.SpinalCore._def[name]();
    }
    static extend() {
        console.warn("deprecated use class extend instead");
    }
    static _get_new_tmp_server_id() {
        FileSystem._cur_tmp_server_id++;
        if (FileSystem._cur_tmp_server_id % 4 === 0)
            FileSystem._cur_tmp_server_id++;
        return FileSystem._cur_tmp_server_id;
    }
    // send changes
    static _send_chan() {
        let out = FileSystem._get_chan_data();
        for (let k in FileSystem._insts)
            FileSystem[k].send(out);
    }
    static _timeout_chan_func() {
        FileSystem._send_chan();
        delete FileSystem._timer_chan;
    }
    static _get_chan_data() {
        let out = { cre: "", mod: "" };
        for (let key in FileSystem._objects_to_send)
            FileSystem._objects_to_send[key]._get_fs_data(out);
        FileSystem._objects_to_send = {};
        return out.cre + out.mod;
    }
    static _timeout_send_func() {
        let out = FileSystem._get_chan_data();
        for (let key in FileSystem._insts) {
            FileSystem._insts[key] += out;
        }
        for (let key in FileSystem._insts) {
            const instance = FileSystem._insts[key];
            if (instance._data_to_send.length) {
                if (instance._session_num === -1)
                    continue;
                if (instance._session_num === -2)
                    instance._session_num = -1;
                else
                    instance._data_to_send = `S ${instance._session_num}` + instance._data_to_send;
                let path = "";
                if (FileSystem.CONNECTOR_TYPE === "Node" || FileSystem.isCordova) {
                    if (FileSystem._port)
                        path = "http://" + FileSystem._url + ":" + FileSystem._port + FileSystem.url_com;
                    else
                        path = "http://" + FileSystem._url + FileSystem.url_com;
                }
                else if (FileSystem.CONNECTOR_TYPE === "Browser") {
                    path = FileSystem.url_com;
                }
                let xhr_object = FileSystem._my_xml_http_request();
                xhr_object.open("POST", path, true);
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
                                    mod_R = SpinalCore_1.SpinalCore._def[c[0]];
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
                    }
                };
                if (FileSystem._disp) {
                    console.log("sent", instance._data_to_send + "E ");
                }
                xhr_object.setRequestHeader('Content-Type', 'text/plain');
                xhr_object.send(instance._data_to_send = "E ");
                instance._data_to_send = "";
            }
        }
    }
    static _my_xml_http_request() {
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
    }
}
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
exports.FileSystem = FileSystem;
//# sourceMappingURL=FileSystem.js.map