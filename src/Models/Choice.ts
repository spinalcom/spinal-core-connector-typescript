import { Model } from "./Model";
import { Val } from "./Val";
import { Lst } from "./Lst";

export class Choice extends Model{

  public num : Val;
  public lst : Lst<any>;

  constructor(data: number | Val, initial_list: any = []){
    super({num : data? data : 0, lst: initial_list});
  }

  filter(){
    return true;
  }
  item(){
   return this._nlst()[this.num.get()];
  }
  get(){
    const item = this.item();
    if (item)
      return item.get();
    return undefined;
  }
  toString(){
    return this.item().toString();
  }

  equals(m: any): boolean {
    if (m instanceof Choice)
      return  super.equals(m);
    else
      return this._nlst()[this.num.get()].equals(m)
  }

  _set(value): boolean {
    //Todo might fail
    var i, j, k, len, ref;
    ref = this._nlst();
    for (j = k = 0, len = ref.length; k < len; j = ++k) {
      i = ref[j];
      if (i.equals(value)) {
        return this.num.set(j);
      }
    }
    return this.num.set(value);
  }

  _nlst(){
    return this.lst.get();
  }

}