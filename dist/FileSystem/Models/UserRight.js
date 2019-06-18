"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Model_1 = require("../../Models/Model");
var UserRight = /** @class */ (function (_super) {
    __extends(UserRight, _super);
    function UserRight() {
        return _super.call(this) || this;
    }
    // @ts-ignore
    UserRight.prototype.set = function () {
        console.log("Set a UserRight is not allowed.");
    };
    return UserRight;
}(Model_1.Model));
exports.UserRight = UserRight;
//# sourceMappingURL=UserRight.js.map