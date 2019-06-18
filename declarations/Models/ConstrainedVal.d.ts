import { Model } from "./Model";
import { Val } from "./Val";
export declare class ConstrainedVal extends Model {
    val: Val;
    _min: Val;
    _max: Val;
    _div: Val;
    constructor(value: any, params?: {
        min?: number | Val;
        max?: number | Val;
        div?: number | Val;
    });
    get(): number;
    ratio(): number;
    delta(): number;
    set_params(params: {
        min?: number | Val;
        max?: number | Val;
        div?: number | Val;
    }): void;
    _set(value: number | ConstrainedVal): boolean;
    check_val(): boolean;
}
