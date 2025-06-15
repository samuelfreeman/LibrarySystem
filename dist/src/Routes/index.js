"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Admin_Routes_1 = __importDefault(require("@server/Routes/adminRoutes/Admin.Routes"));
const mainRoute = (0, express_1.Router)();
mainRoute.use("admin", Admin_Routes_1.default);
exports.default = mainRoute;
