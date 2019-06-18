/***
 * @property _cur_mid {number} current model id (used to create new ids)
 * @property _counter {number} nb "change rounds" since the beginning ( * 2 to differenciate direct and indirect changes )
 * @property _modlist {number} changed models (current round)
 * @property _n_processes {number} new processes (that will need a first onchange call in "force" mode)
 * @property _cur_process_id {number} current process id (used to create new ids)
 * @property _timeout {number} timer used to create a new "round"
 * @property _force_m {number} if _force_m == true, every has_been_modified function will return true
 * @property _synchro {number} synchronizer (link to the server that will store files)
 *
 */
import { Model } from "./Models/Model";
import { Bool } from "./Models/Bool";
import { Obj } from "./Models/Obj";
import { Lst } from "./Models/Lst";
import { Val } from "./Models/Val";
import { Str } from "./Models/Str";
export declare class ModelProcessManager {
    static _cur_mid: number;
    static _counter: number;
    static _modlist: object;
    static _n_processes: object;
    static _cur_process_id: number;
    static _timeout: any;
    static _force_m: boolean;
    static _synchro: any;
    static new_from_state(str: string): any;
    static load(filename: string, func: any): any;
    static conv(model: any): Model | Lst<any> | Str | Val | Bool | Obj<any>;
    static get_object_class(obj: object): any;
    static _get_attribute_names(m: Model | object): string[];
    static _new_model_from_state(mid: any, map: any): any;
    static _need_sync_processes(): void;
    static _sync_processes(): void;
}
