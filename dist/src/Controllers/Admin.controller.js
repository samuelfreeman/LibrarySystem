"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.register = void 0;
const Res_1 = __importDefault(require("@server/Utils/Res"));
const Admin_service_1 = require("@server/services/Admin.service");
const jwt_1 = require("@server/Utils/jwt");
const register = async (req, res) => {
    try {
        const input = req.body;
        const admin = await (0, Admin_service_1.registerAdmin)(input);
        const token = (0, jwt_1.signToken)({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });
        Res_1.default.success(res, "Admin registered successfully", { ...admin, token });
    }
    catch (error) {
        Res_1.default.error(res, "Failed to register admin", error.message);
    }
};
exports.register = register;
const loginAdmin = async (req, res) => {
    try {
        const input = req.body;
        const admin = await (0, Admin_service_1.login)(input);
        const token = (0, jwt_1.signToken)({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });
        Res_1.default.success(res, "Admin logged in successfully", { ...admin, token });
    }
    catch (error) {
        Res_1.default.error(res, "Failed to login admin", error.message);
    }
};
exports.loginAdmin = loginAdmin;
