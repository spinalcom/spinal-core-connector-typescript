import { Model } from "../../Models/Model";
import { ModelProcessManager } from "../../ModelProcessManager";
import { Ptr } from "./Ptr";

export class File extends Model{

  public name : string;
  public _created_at : Date;
  public _ptr : Ptr;
  public _info : object;

  constructor(name: string = "", ptr_or_model = 0, info = {}){
    super();
    let cp_info = Object.assign({}, info);

    // @ts-ignore
    if (ptr_or_model instanceof Model){
      if (!cp_info.hasOwnProperty("model_type"))
        {
          // @ts-ignore
          cp_info.model_type =ModelProcessManager.get_object_class(ptr_or_model);
        }
      if (ptr_or_model.hasOwnProperty('get_file_info'))
        {
          // @ts-ignore
          ptr_or_model.get_file_info(cp_info)
        }
    }
    this.add_attr({
      name,
      _created_at: new Date(),
      _ptr: new Ptr(ptr_or_model),
      _info: cp_info
    })
  }
  load(callback){
    this._ptr.load(callback);
  }

}