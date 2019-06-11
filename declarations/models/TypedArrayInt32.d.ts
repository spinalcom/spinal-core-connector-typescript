import { TypedArray } from "./TypedArray";
export declare class TypedArrayInt32 extends TypedArray<number> {
    constructor(size: any[], data: any);
    base_type(): Int32ArrayConstructor;
    deep_copy(): any;
}
