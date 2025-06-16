"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOtp = exports.loginAdmin = exports.register = void 0;
const Res_1 = __importDefault(require("../Utils/Res"));
const Admin_service_1 = require("../services/Admin.service");
const jwt_1 = require("../Utils/jwt");
const mail_1 = require("../Utils/mail");
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
        await (0, mail_1.sendMail)(admin.email, "Login Notification", (0, mail_1.otpEmail)(admin.otp, admin.username));
        Res_1.default.success(res, "Admin otp sent successfully", { ...admin });
    }
    catch (error) {
        Res_1.default.error(res, "Failed to login admin", error.message);
    }
};
exports.loginAdmin = loginAdmin;
const verifyOtp = async (req, res) => {
    try {
        const input = req.body;
        const admin = await (0, Admin_service_1.verifyAdminOtp)(input.otp, input.username);
        const token = (0, jwt_1.signToken)({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });
        Res_1.default.Otpsuccess(res, "Admin otp verified  successfully", { ...admin, token });
    }
    catch (error) {
        Res_1.default.error(res, "Failed to  verify otp", error.message);
    }
};
exports.verifyOtp = verifyOtp;
