import { Model } from "../../Models/Model";
import { Ptr } from "./Ptr";
export declare class File extends Model {
    name: string;
    _created_at: Date;
    _ptr: Ptr;
    _info: object;
    constructor(name?: string, ptr_or_model?: number, info?: {});
    load(callback: any): void;
}
