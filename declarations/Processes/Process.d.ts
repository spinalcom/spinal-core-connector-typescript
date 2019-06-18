import { Model } from "../Models/Model";
export declare class Process {
    process_id: number;
    models: Model[];
    constructor(model: Model | Model[], onChangeConstruction?: boolean);
    destructor(): void;
    onChange(): void;
}
