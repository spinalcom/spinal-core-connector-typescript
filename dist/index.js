"use strict";
exports.__esModule = true;
var Bool_1 = require("./Models/Bool");
exports.Bool = Bool_1.Bool;
var Choice_1 = require("./Models/Choice");
exports.Choice = Choice_1.Choice;
var Vec_1 = require("./Models/Vec");
exports.Vec = Vec_1.Vec;
var Val_1 = require("./Models/Val");
exports.Val = Val_1.Val;
var User_1 = require("./Models/User");
exports.User = User_1.User;
var TypedArrayInt32_1 = require("./Models/TypedArrayInt32");
exports.TypedArrayInt32 = TypedArrayInt32_1.TypedArrayInt32;
var TypedArrayFloat64_1 = require("./Models/TypedArrayFloat64");
exports.TypedArrayFloat64 = TypedArrayFloat64_1.TypedArrayFloat64;
var Str_1 = require("./Models/Str");
exports.Str = Str_1.Str;
var Obj_1 = require("./Models/Obj");
exports.Obj = Obj_1.Obj;
var Model_1 = require("./Models/Model");
exports.Model = Model_1.Model;
var Lst_1 = require("./Models/Lst");
exports.Lst = Lst_1.Lst;
var ConstrainedVal_1 = require("./Models/ConstrainedVal");
exports.ConstrainedVal = ConstrainedVal_1.ConstrainedVal;
var ConstOrNot_1 = require("./Models/ConstOrNot");
exports.ConstOrNotModel = ConstOrNot_1.ConstOrNotModel;
var SpinalCore_1 = require("./SpinalCore");
var FileSystem_1 = require("./FileSystem/FileSystem");
exports.FileSystem = FileSystem_1.FileSystem;
var Directory_1 = require("./FileSystem/Models/Directory");
exports.Directory = Directory_1.Directory;
var File_1 = require("./FileSystem/Models/File");
exports.File = File_1.File;
var Path_1 = require("./FileSystem/Models/Path");
exports.Path = Path_1.Path;
var Pbr_1 = require("./FileSystem/Models/Pbr");
exports.Pbr = Pbr_1.Pbr;
var Ptr_1 = require("./FileSystem/Models/Ptr");
exports.Ptr = Ptr_1.Ptr;
var RightSetList_1 = require("./FileSystem/Models/RightSetList");
exports.RightSetList = RightSetList_1.RightSetList;
var RightsItem_1 = require("./FileSystem/Models/RightsItem");
exports.RightsItem = RightsItem_1.RightsItem;
var SessionModel_1 = require("./FileSystem/Models/SessionModel");
exports.SessionModel = SessionModel_1.SessionModel;
var TiffFile_1 = require("./FileSystem/Models/TiffFile");
exports.TiffFile = TiffFile_1.TiffFile;
var UserRight_1 = require("./FileSystem/Models/UserRight");
exports.UserRight = UserRight_1.UserRight;
var ModelProcessManager_1 = require("./ModelProcessManager");
exports.ModelProcessManager = ModelProcessManager_1.ModelProcessManager;
var SpinalUserManager_1 = require("./SpinalUserManager");
exports.SpinalUserManager = SpinalUserManager_1.SpinalUserManager;
var root = typeof window !== "undefined" ? window : global;
var model_export = {};
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
    var obj = root.spinalCore;
}
else {
    for (var key in model_export) {
        if (model_export.hasOwnProperty(key)) {
            root[key] = model_export[key];
            SpinalCore_1.SpinalCore.register_models(model_export[key]);
        }
    }
    module.exports = SpinalCore_1.SpinalCore;
    module.exports.Model = Model_1.Model;
}
//# sourceMappingURL=index.js.map