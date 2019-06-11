import { Obj } from "./Obj";
export declare class Str<String> extends Obj<string> {
    _data: string;
    length: number;
    constructor(data?: any);
    toggle(str: string, space?: string): void;
    contains(str: any): boolean;
    equals(str: string): boolean;
    ends_with(str: any): boolean;
    deep_copy(): Str<string>;
    _get_fs_data(out: any): string;
    _set(value?: any): boolean;
    _get_state(): string;
    _set_state(str: string, map: object): void;
}
