"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Bool_1 = require("./Models/Bool");
const Choice_1 = require("./Models/Choice");
const Vec_1 = require("./Models/Vec");
const Val_1 = require("./Models/Val");
const User_1 = require("./Models/User");
const TypedArrayInt32_1 = require("./Models/TypedArrayInt32");
const TypedArrayFloat64_1 = require("./Models/TypedArrayFloat64");
const Str_1 = require("./Models/Str");
const Obj_1 = require("./Models/Obj");
const Model_1 = require("./Models/Model");
const Lst_1 = require("./Models/Lst");
const ConstrainedVal_1 = require("./Models/ConstrainedVal");
const ConstOrNot_1 = require("./Models/ConstOrNot");
const SpinalCore_1 = require("./SpinalCore");
const FileSystem_1 = require("./FileSystem/FileSystem");
const Directory_1 = require("./FileSystem/Models/Directory");
const File_1 = require("./FileSystem/Models/File");
const Path_1 = require("./FileSystem/Models/Path");
const Pbr_1 = require("./FileSystem/Models/Pbr");
const Ptr_1 = require("./FileSystem/Models/Ptr");
const RightSetList_1 = require("./FileSystem/Models/RightSetList");
const RightsItem_1 = require("./FileSystem/Models/RightsItem");
const SessionModel_1 = require("./FileSystem/Models/SessionModel");
const TiffFile_1 = require("./FileSystem/Models/TiffFile");
const UserRight_1 = require("./FileSystem/Models/UserRight");
const ModelProcessManager_1 = require("./ModelProcessManager");
const SpinalUserManager_1 = require("./SpinalUserManager");
// @ts-ignore
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
model_export['spinalCore'] = SpinalCore_1.SpinalCore;
model_export['Bool'] = Bool_1.Bool;
model_export['Choice'] = Choice_1.Choice;
model_export['ConstOrNotModel'] = ConstOrNot_1.ConstOrNotModel;
model_export['ContrainedVal'] = ConstrainedVal_1.ConstrainedVal;
model_export['Lst'] = Lst_1.Lst;
model_export['Model'] = Model_1.Model;
model_export['Obj'] = Obj_1.Obj;
model_export['Str'] = Str_1.Str;
model_export['TypedArrayFloat64'] = TypedArrayFloat64_1.TypedArrayFloat64;
model_export['TypedArrayInt34'] = TypedArrayInt32_1.TypedArrayInt32;
model_export['User'] = User_1.User;
model_export['Val'] = Val_1.Val;
model_export['Vec'] = Vec_1.Vec;
model_export['FileSystem'] = FileSystem_1.FileSystem;
model_export['Directory'] = Directory_1.Directory;
model_export['File'] = File_1.File;
model_export['Path'] = Path_1.Path;
model_export['Pbr'] = Pbr_1.Pbr;
model_export['Ptr'] = Ptr_1.Ptr;
model_export['RightSetList'] = RightSetList_1.RightSetList;
model_export['RightItem'] = RightsItem_1.RightsItem;
model_export['SessionModel'] = SessionModel_1.SessionModel;
model_export['TiffFile'] = TiffFile_1.TiffFile;
model_export['UserRight'] = UserRight_1.UserRight;
model_export['ModelProcessManager'] = ModelProcessManager_1.ModelProcessManager;
model_export['SpinalUserManager'] = SpinalUserManager_1.SpinalUserManager;
if (root.hasOwnProperty('spinalCore')) {
    // @ts-ignore
    const obj = root.spinalCore;
    module.exports = obj;
}
else {
    // @ts-ignore
    if (typeof root.spinalCore !== "undefined") {
        for (let key in model_export) {
            if (model_export.hasOwnProperty(key)) {
                root[key] = model_export[key];
            }
        }
    }
    module.exports = SpinalCore_1.SpinalCore;
}
//# sourceMappingURL=index.js.map