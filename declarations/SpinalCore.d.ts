/// <reference types="node" />
import { FileSystem } from "./FileSystem/FileSystem";
import { Model } from "./Models/Model";
import { Ptr } from "./FileSystem/Models/Ptr";
export declare class SpinalCore {
    static _def: object;
    version: string;
    static connect(options: any): FileSystem;
    static store(fs: FileSystem, model: Model, path: string, callback_success: any, callback_error: any): void;
    static register_models(models: any): void;
    static register_models_check(func: any): void;
    static load(fs: any, path: any, callback_success: any, callback_error: any): any;
    static load_type(fs: any, type: any, callback_success: any, callback_error: any): void;
    static load_right(fs: FileSystem, ptr: number, callback_success: any, callback_error: any): void;
    static share_model(fs: FileSystem, ptr: Ptr, file_name: string, right_flags: string, targetName: string): NodeJS.Timeout;
    static right_flags(): {
        AD: number;
        WR: number;
        RD: number;
    };
    static extend(): void;
}
