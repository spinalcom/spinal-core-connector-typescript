import { Model } from "./Model";
export declare class ConstOrNotModel extends Model {
    model: Model;
    bool: boolean;
    check_disabled: boolean;
    constructor(bool: boolean, model: Model, check_disabled?: boolean);
    get(): any;
    set(value: Model): boolean;
    toString(): string;
}
