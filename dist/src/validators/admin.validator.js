"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdminSchema = void 0;
// validators/adminSchema.ts
const zod_1 = require("zod");
exports.registerAdminSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1),
    lastName: zod_1.z.string().min(1),
    contact: zod_1.z.string().min(10),
    username: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
