import { Process } from "./Process";

export class BindProcess extends Process {
  public func : ()=>{};

  constructor(model, onChangeConstruction, func){
    super(model, onChangeConstruction);
    this.func = func;
  }

  onChange() {
    this.func();
  }
}