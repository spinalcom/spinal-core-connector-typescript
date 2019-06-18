import { Process } from "./Process";
export declare class BindProcess extends Process {
    func: () => {};
    constructor(model: any, onChangeConstruction: any, func: any);
    onChange(): void;
}
