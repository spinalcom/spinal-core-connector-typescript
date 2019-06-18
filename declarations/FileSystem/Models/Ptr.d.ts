import { Model } from "../../Models/Model";
export declare class Ptr extends Model {
    data: {
        model?: Model;
        value?: any;
    };
    constructor(model: any);
    load(callback: any): void;
    _get_fs_data(out: any): string;
    _set(model: any): boolean;
    _get_state(): string;
    _set_state(str: string, map: object): void;
}
