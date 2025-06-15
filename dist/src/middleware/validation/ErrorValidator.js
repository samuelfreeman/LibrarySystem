"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateError = void 0;
const Res_1 = __importDefault(require("@server/Utils/Res"));
const validateError = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        Res_1.default.error(res, "Validation failed", result.error.format(), 400);
        return;
    }
    // Attach the validated data to request for later 
    req.body = result.data;
    next();
};
exports.validateError = validateError;
