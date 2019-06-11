declare type CallBack = (res: any, err: any) => any;
import { Model } from "../Models/Model";
import { new_alert_msg } from "../DomHelper";
import { Ptr } from "./Models/Ptr";
export declare class FileSystem {
    static popup: new_alert_msg | number;
    static debug: boolean;
    static _cur_tmp_server_id: number;
    static _sig_server: boolean;
    static _disp: boolean;
    static _userid: string;
    static _timeout_reconnect: number;
    static isCordova: boolean;
    static _XMLHttpRequest: any;
    static _objects_to_send: {};
    static _timer_send: any;
    static _timer_chan: any;
    static _nb_callbacks: number;
    static _callbacks: {};
    static _type_callbacks: any[];
    static _nb_insts: number;
    static _insts: {};
    static _files_to_upload: {};
    static _ptr_to_update: {};
    static _tmp_objects: {};
    static _objects: {};
    static _url: string;
    static _port: string;
    static url_com: string;
    static url_upload: string;
    static CONNECTOR_TYPE: string;
    static _home_dir: string;
    readyState: number;
    status: number;
    _data_to_send: string;
    _session_num: number;
    _num_inst: number;
    make_channel_error_timer: number | Date;
    static _password: string;
    responseText: string;
    constructor();
    load(path: string, callback: CallBack): void;
    load_type(type: string, callback: CallBack): void;
    load_or_make_dir(dir: any, callback: any): void;
    load_ptr(ptr: number, callback: CallBack): void;
    load_right(ptr: number, callback: CallBack): void;
    share_model(ptr: Ptr | number, file_name: string, share_type: string, targetName: string): void;
    send(data: string): void;
    make_channel(): void;
    onConnectionError(error_code: number): void;
    static get_inst(): FileSystem;
    static set_server_id_if_necessary(out: any, obj: any): string;
    static signal_change(m: Model): void;
    static _tmp_id_to_real(tmp_id: any, res: any): void;
    static _create_model_by_name(name: any): any;
    static extend(): void;
    static _get_new_tmp_server_id(): number;
    static _send_chan(): void;
    static _timeout_chan_func(): void;
    static _get_chan_data(): string;
    static _timeout_send_func(): void;
    static _my_xml_http_request(): any;
}
export {};
