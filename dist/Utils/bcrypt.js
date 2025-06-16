"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const argon2_1 = require("argon2");
const hashPassword = async (password) => {
    const hashedPassword = await (0, argon2_1.hash)(password);
    return hashedPassword;
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    const isValid = await (0, argon2_1.verify)(hashedPassword, password);
    return isValid;
};
exports.verifyPassword = verifyPassword;
