import { Model } from "./Model";
export declare class Obj<T> extends Model {
    _data: T;
    constructor(data?: any);
    toString(): string;
    equals(obj: any): boolean;
    get(): T;
    _get_fs_data(out: any): string;
    _set(value: any): boolean;
    _get_state(): string;
    _set_state(str: string, map: object): void;
}
