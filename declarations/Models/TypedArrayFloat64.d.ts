import { TypedArray } from "./TypedArray";
export declare class TypedArrayFloat64 extends TypedArray<number> {
    constructor(size: any[], data: any);
    base_type(): Float64ArrayConstructor;
    deep_copy(): any;
}
