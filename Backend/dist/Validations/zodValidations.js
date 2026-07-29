"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserObject = void 0;
const zod_1 = require("zod");
exports.UserObject = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().includes("@"),
    Password: zod_1.z.string().min(2)
});
//# sourceMappingURL=zodValidations.js.map