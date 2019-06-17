import { Model } from "../../Models/Model";
import {File} from "./File"
import { FileSystem } from "../FileSystem";
export class Path extends Model {

  public remaining : number;
  public file : File;
  public to_upload: number;
  constructor(file? : File){
    super();

    // @ts-ignore
    let size = file ? file.hasOwnProperty("fileSize") ? file.fileSize : file.size : 0;

    this.add_attr({
      file: file,
      remaining: size,
      to_upload: size
    })
  }

  get_file_info(info) {
    info.remaining = this.remaining;
    info.to_upload = this.to_upload;
  }

  // @ts-ignore
  _get_fs_data(out) {
    super._get_fs_data(out);
    if (typeof this.file !== "undefined" && this._server_id & 3)
    return  FileSystem._files_to_upload[this._server_id] = this;
  };
}