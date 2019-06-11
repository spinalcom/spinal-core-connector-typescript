import { Lst } from "./Lst";
import { Val } from "./Val";


export class Vec<T> extends Lst<T>{
  constructor(data){
    super(data);
  }

  base_type(): any {
      return Val;
  }
  _underlying_fs_type(){
    return "Lst";
  }

}