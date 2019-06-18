import { File } from "./File";
import { Ptr } from "./Ptr";
export declare class TiffFile extends File {
    _ptr_tiff: Ptr;
    _has_been_converted: number;
    constructor(name?: string, ptr_or_model?: number, ptr_tiff?: number, info?: {});
    load_tiff(callback: any): void;
}
