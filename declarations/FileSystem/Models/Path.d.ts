import { Model } from "../../Models/Model";
import { File } from "./File";
export declare class Path extends Model {
    remaining: number;
    file: File;
    to_upload: number;
    constructor(file?: File);
    get_file_info(info: any): void;
    _get_fs_data(out: any): this;
}
