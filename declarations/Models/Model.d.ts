import { Process } from "../Processes/Process";
export interface BindCallBack {
    (): void;
}
export declare class Model {
    _attribute_names: string[];
    model_id: number;
    _processes: Process[];
    _parents: any[];
    _date_last_modification: number;
    _server_id: number;
    constructor(attr?: any);
    destructor(): void;
    /**
     * return true if this (or a child of this) has changed since the previous synchronisation
     * @returns {boolean}
     */
    hasBeenModified(): boolean;
    /**
     * return true if this has changed since previous synchronisation due to a
     * direct modification (not from a child one)
     * @returns {boolean}
     */
    has_been_directly_modified(): boolean;
    /**
     * if this has been modified during the preceding round, f will be called
     * @param f {Process| BindCallBack} If f is a process:
     * process.onchange will be called each time this (or a child of this) will
     * be modified.
     * process.destructor will be called if this is destroyed.
     * can be seen as a bind with an object
     *onchange_construction
     *
     * @param onChangeConstruction {boolean} true means that onchange will be automatically called after the bind
     */
    bind(f: Process | BindCallBack, onChangeConstruction?: boolean): void;
    /**
     *
     * @param f {Process | BindCallBack}
     */
    unbind(f: Process | BindCallBack): void;
    /**
     * return a copy of data in a "standard" representation (e.g. string, number, objects, ...)
     * users are encouraged to use Models as much as possible
     * (meaning that get should not be called for every manipulation),
     * adding methods for manipulation of data if necessary
     * (e.g. toggle, find, ... in Lst, Str, ...).
     * May be redefined for specific types (e.g. Str, Lst, ...)
     */
    get(): any;
    /**
     * modify data, using another values, or Model instances.
     * Should not be redefined (but _set should be)
     * returns true if object os modified
     * @param value
     */
    set(value: any): boolean;
    /**
     * modify state according to str. str can be the result of a previous @get_state
     * @param str
     */
    set_state(str: string): void;
    get_state(date?: number): string;
    /**
     *
     * @param n {string | object} name of the attribute for p or a javascript
     * object
     * @param p
     * @param signalChange
     */
    add_attr(n: any, p?: Model | Function, signalChange?: boolean): void;
    /**
     *
     * @param name {string} name of the attribute to remove
     * @param signalChange
     */
    rem_attr(name: string | number, signalChange?: boolean): void;
    /**
     *
     * @param name {string} name of the attribute to change
     * @param value {Model | Function} value of the attribute
     */
    mod_attr(name: string | number, value: Model | Function): void;
    /**
     * add / mod/ rem attr to get the same data than o
     * @param o {object}
     */
    set_attr(o: any): void;
    /**
     * dimension of the object -> [] for a scalar, [ length ] for a vector,
     * [ nb_row, nb_cols ] for a matrix...
     * @param forDisplay {boolean}
     */
    size(forDisplay: boolean): [];
    /**
     *
     * @param forDisplay
     */
    dim(forDisplay: boolean): number;
    equals(m: Model): boolean;
    get_parents_that_chekc(func_to_check: Function): any;
    deep_copy(): any;
    real_change(): boolean;
    cosmetic_attribute(name: any): boolean;
    _get_state(): string;
    /**
     * Send data to server
     * @param out
     *
     */
    _get_fs_data(out: any): string;
    _set(value: any): boolean;
    _signal_change(change_level?: number): void;
    _set_state(str: string, map: object): void;
    _get_parents_that_check_rec(res: Array<any>, visited: {
        [index: number]: boolean;
    }, fun_to_check: Function): void;
    _set_state_if_same_type(mid: any, map: any): boolean;
    _get_flat_model_map(map: any, date: any): void;
}
