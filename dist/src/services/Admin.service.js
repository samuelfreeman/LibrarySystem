"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAdmin = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = require("@server/Utils/bcrypt");
const prisma = new client_1.PrismaClient();
const registerAdmin = async (input) => {
    const hashedPassword = await (0, bcrypt_1.hashPassword)(input.password);
    const admin = await prisma.admin.create({
        data: {
            ...input,
            password: hashedPassword
        },
    });
    return admin;
};
exports.registerAdmin = registerAdmin;
