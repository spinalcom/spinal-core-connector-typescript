import { Model } from "./Model";
export declare abstract class TypedArray<T> extends Model {
    _data: T[];
    _size: any;
    protected constructor(size?: any, data?: any);
    abstract base_type(): any;
    dim(): number;
    size(d: any): any;
    set_val(index: number, value: T): void;
    nb_items(): any;
    toString(): string;
    get(index: any): T | T[];
    resize(new_size: any): void;
    _set(str: any): boolean;
    _get_index(index: any): any;
    _get_fs_data(out: any): string;
    _get_state(): string;
    _set_state(str: string, map: object): void;
}
