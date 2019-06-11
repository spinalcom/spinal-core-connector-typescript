import { Model } from "./Model";
import { Val } from "./Val";
import { Lst } from "./Lst";
export declare class Choice extends Model {
    num: Val;
    lst: Lst<any>;
    constructor(data: number | Val, initial_list?: any);
    filter(): boolean;
    item(): any;
    get(): any;
    toString(): any;
    equals(m: any): boolean;
    _set(value: any): boolean;
    _nlst(): any[];
}
