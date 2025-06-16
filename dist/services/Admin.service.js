"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdminOtp = exports.login = exports.registerAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("../Utils/bcrypt");
const generateOTP_1 = require("../Utils/generateOTP");
const prisma = new client_1.PrismaClient();
const registerAdmin = async (input) => {
    const hashedPassword = await (0, bcrypt_1.hashPassword)(input.password);
    const emailAdmin = await prisma.admin.findUnique({
        where: {
            email: input.email,
        },
    });
    if (emailAdmin) {
        throw new Error("Admin with this email already exists");
    }
    const usedUsername = await prisma.admin.findUnique({
        where: {
            username: input.username,
        },
    });
    if (usedUsername) {
        throw new Error("Admin with this username already exists");
    }
    const admin = await prisma.admin.create({
        data: {
            ...input,
            password: hashedPassword,
            otp: 0
        },
    });
    return admin;
};
exports.registerAdmin = registerAdmin;
const login = async (input) => {
    const otp = (0, generateOTP_1.generateOTP)();
    const admin = await prisma.admin.findUnique({
        where: {
            username: input.username,
        },
    });
    if (!admin) {
        throw new Error("Admin not found");
    }
    const password = await (0, bcrypt_1.verifyPassword)(input.password, admin.password);
    if (!password) {
        throw new Error("Invalid password");
    }
    const updateOTP = await prisma.admin.update({
        where: {
            id: admin.id
        },
        data: {
            otp: otp
        }
    });
    if (!updateOTP) {
        throw new Error("Failed to update OTP");
    }
    return updateOTP;
};
exports.login = login;
const verifyAdminOtp = async (otp, username) => {
    const admin = await prisma.admin.findUnique({
        where: {
            username: username,
        },
    });
    if (!admin) {
        throw new Error("Admin not found");
    }
    console.log(admin.otp, otp);
    if (admin.otp !== otp) {
        throw new Error("Invalid OTP");
    }
    return admin;
};
exports.verifyAdminOtp = verifyAdminOtp;
