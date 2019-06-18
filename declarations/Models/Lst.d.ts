import { Model } from "./Model";
export declare class Lst<T> extends Model {
    length: number;
    constructor(data?: any);
    static_length(): number;
    default_value(): number;
    base_type(): any;
    get(): Array<T>;
    size(): any;
    toString(): string;
    equals(lst: Lst<T>): boolean;
    push(value: T, force?: boolean): void;
    pop(): T;
    clear(): void;
    unshift(value: T): number;
    shift(): T;
    remove(item: T): void;
    remove_ref(item: any): void;
    filter(f: any): any[];
    detect(f: any): T | undefined;
    sorted(sort: any): Array<T>;
    has(f: any): boolean;
    indexOf(value: T): 1 | -1;
    indexOf_ref(value: T): number;
    contains(value: T): boolean;
    contains_ref(value: T): boolean;
    toggle(value: T): boolean;
    toggle_ref(value: T): boolean;
    slice(begin: number, end?: number): Lst<T>;
    concat(new_tab: Lst<T>, force?: boolean): void;
    splice(index: number, n?: number): void;
    insert(index: number, lst: Lst<T>): void;
    set_or_push(index: number, val: T): any;
    trim(size: number): void;
    join(sep: string): string;
    deep_copy(): any;
    back(): any;
    real_change(): boolean;
    _set(value: Lst<T>): boolean;
    _get_flat_model_map(map: object, date: any): object;
    _get_fs_data(out: any): string;
    _get_state(): string;
    _set_state(str: string, map: object): void;
    _static_size_check(force: boolean): boolean;
}