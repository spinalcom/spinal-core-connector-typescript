import {File} from "./File"
import { Ptr } from "./Ptr";
export class TiffFile extends File{

  public  _ptr_tiff : Ptr;
  public _has_been_converted: number;

  constructor(name: string = "", ptr_or_model = 0, ptr_tiff = 0, info ={}){
    super(name, ptr_or_model, info);
    this.add_attr({
      _ptr_tiff: new Ptr(ptr_tiff),
      _has_been_converted: 0
    })
  }

  load_tiff(callback){
    return this._ptr_tiff.load(callback);
  }
}