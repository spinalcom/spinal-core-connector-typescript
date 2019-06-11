import { Model } from "./Model";

export class ConstOrNotModel extends Model {
  public model: Model;
  public bool: boolean;
  public check_disabled: boolean;

  constructor(bool: boolean, model: Model, check_disabled = true) {
    super({bool, model, check_disabled});
  }

  get() {
    if (this.model)
      return this.model.get();
  }

  set(value: Model) {
    if (this.model)
      return this.model.set(value);
    return false;
  }

  toString(){
    if (this.model)
      return this.model.toString();
    return "";
  }
}