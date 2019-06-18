import { Lst } from "../../Models/Lst";
import { TiffFile } from "./TiffFile";
import { File } from "./File";
export declare class Directory extends Lst<File | TiffFile> {
    constructor();
    base_type(): typeof File;
    find(name: string): any;
    load(name: string, callback: Function): void;
    has(name: string): boolean;
    add_file(name: string, obj: any, params?: {}): any;
    add_tiff_file(name: string, obj: any, tiff_obj: any, params?: {}): any;
    force_add_file(name: any, obj: any, params?: {}): File;
    get_file_info(info: any): string;
}
