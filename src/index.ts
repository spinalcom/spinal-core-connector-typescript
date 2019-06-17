import { Bool } from "./Models/Bool";
import { Choice } from "./Models/Choice";
import { Vec } from "./Models/Vec";
import { Val } from "./Models/Val";
import { User } from "./Models/User";
import { TypedArrayInt32 } from "./Models/TypedArrayInt32";
import { TypedArrayFloat64 } from "./Models/TypedArrayFloat64";
import { Str } from "./Models/Str";
import { Obj } from "./Models/Obj";
import { Model } from "./Models/Model";
import { Lst } from "./Models/Lst";
import { ConstrainedVal } from "./Models/ConstrainedVal";
import { ConstOrNotModel } from "./Models/ConstOrNot";
import { SpinalCore as spinalCore } from "./SpinalCore";
import { FileSystem } from "./FileSystem/FileSystem";
import { Directory } from "./FileSystem/Models/Directory";
import { File } from "./FileSystem/Models/File"
import { Path } from "./FileSystem/Models/Path";
import { Pbr } from "./FileSystem/Models/Pbr";
import { Ptr } from "./FileSystem/Models/Ptr";
import { RightSetList } from "./FileSystem/Models/RightSetList";
import { RightsItem } from "./FileSystem/Models/RightsItem";
import { SessionModel } from "./FileSystem/Models/SessionModel";
import { TiffFile } from "./FileSystem/Models/TiffFile";
import { UserRight } from "./FileSystem/Models/UserRight";
import { ModelProcessManager } from "./ModelProcessManager";
import { SpinalUserManager } from "./SpinalUserManager";


const root = window ? window : global;

//export default spinalCore;
/*export {
  Bool,
  Choice,
  ConstOrNotModel,
  ConstrainedVal,
  Lst,
  Model,
  Obj,
  Str,
  TypedArrayFloat64,
  TypedArrayInt32,
  User,
  Val,
  Vec,
  FileSystem,
  Directory,
  File,
  Path,
  Pbr,
  Ptr,
  RightSetList,
  RightsItem,
  SessionModel,
  TiffFile,
  UserRight,
  ModelProcessManager,
  SpinalUserManager
}*/
const model_export = {};

model_export['spinalCore'] = spinalCore;
model_export['Bool'] = Bool;
model_export['Choice'] = Choice;
model_export['ConstOrNotModel'] = ConstOrNotModel;
model_export['ContrainedVal'] = ConstrainedVal;
model_export['Lst'] = Lst;
model_export['Model'] = Model;
model_export['Obj'] = Obj;
model_export['Str'] = Str;
model_export['TypedArrayFloat64'] = TypedArrayFloat64;
model_export['TypedArrayInt34'] = TypedArrayInt32;
model_export['User'] = User;
model_export['Val'] = Val;
model_export['Vec'] = Vec;
model_export['FileSystem'] = FileSystem;
model_export['Directory'] = Directory;
model_export['File'] = File;
model_export['Path'] = Path;
model_export['Pbr'] = Pbr;
model_export['Ptr'] = Ptr;
model_export['RightSetList'] = RightSetList;
model_export['RightItem'] = RightsItem;
model_export['SessionModel'] = SessionModel;
model_export['TiffFile'] = TiffFile;
model_export['UserRight'] = UserRight;
model_export['ModelProcessManager'] = ModelProcessManager;
model_export['SpinalUserManager'] = SpinalUserManager;





if (root.hasOwnProperty('spinalCore')) {
  // @ts-ignore
  const obj : spinalCore = root.spinalCore;

  module.exports = obj;
} else
{
  // @ts-ignore

    for (let key  in model_export) {
      if (model_export.hasOwnProperty(key)) {
        root[key] = model_export[key];
        spinalCore.register_models(model_export[key]);
      }

  }
  module.exports = spinalCore;
}
