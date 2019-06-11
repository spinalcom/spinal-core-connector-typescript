import { Obj } from "./Obj";
export declare class Bool extends Obj<boolean> {
    constructor(data?: any);
    toggle(): void;
    toBoolean(): boolean;
    deep_copy(): Bool;
    _set(value: Bool | boolean | string): boolean;
    _get_fs_data(out: any): string;
}
