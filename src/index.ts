export { Bool } from "./Models/Bool";
export { Choice } from "./Models/Choice";
export { Vec } from "./Models/Vec";
export { Val } from "./Models/Val";
export { User } from "./Models/User";
export { TypedArrayInt32 } from "./Models/TypedArrayInt32";
export { TypedArrayFloat64 } from "./Models/TypedArrayFloat64";
export { Str } from "./Models/Str";
export { Obj } from "./Models/Obj";
export { Model } from "./Models/Model";
export { Lst } from "./Models/Lst";
export { ConstrainedVal } from "./Models/ConstrainedVal";
export { ConstOrNotModel } from "./Models/ConstOrNot";
export { FileSystem } from "./FileSystem/FileSystem";
export { Directory } from "./FileSystem/Models/Directory";
export { File } from "./FileSystem/Models/File"
export { Path } from "./FileSystem/Models/Path";
export { Pbr } from "./FileSystem/Models/Pbr";
export { Ptr } from "./FileSystem/Models/Ptr";
export { RightSetList } from "./FileSystem/Models/RightSetList";
export { RightsItem } from "./FileSystem/Models/RightsItem";
export { SessionModel } from "./FileSystem/Models/SessionModel";
export { TiffFile } from "./FileSystem/Models/TiffFile";
export { UserRight } from "./FileSystem/Models/UserRight";
export { ModelProcessManager } from "./ModelProcessManager";
export { SpinalUserManager } from "./SpinalUserManager";

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



import { SpinalCore as spinalCore } from "./SpinalCore";

const root = typeof window !== "undefined" ? window : global;


const model_export = {};

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

for (let key  in model_export) {
  if (model_export.hasOwnProperty(key)) {
    root[key] = model_export[key];
    spinalCore.register_models(model_export[key]);
  }
}

export let SpinalCore;

if (root["SpinalCore"] === undefined)
{
  SpinalCore = spinalCore;
  root['SpinalCore'] = SpinalCore;
}









