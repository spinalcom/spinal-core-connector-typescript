import { Obj } from "./Obj";
export declare class Val extends Obj<number> {
    _data: number;
    constructor(data?: any);
    toggle(): void;
    toBoolean(): boolean;
    deep_copy(): Val;
    add(value?: number): void;
    _set(value: any): boolean;
}
