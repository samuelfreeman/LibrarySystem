"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
// utils/logger.ts
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// Ensure logs directory exists
const logDir = path_1.default.join(__dirname, "..", "logs");
if (!fs_1.default.existsSync(logDir))
    fs_1.default.mkdirSync(logDir);
// Create logger
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ level, message, timestamp }) => `[${timestamp}] ${level}: ${message}`)),
    transports: [
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple()),
        }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, "combined.log") }),
        new winston_1.default.transports.File({ filename: path_1.default.join(logDir, "error.log"), level: "error" }),
    ],
});
exports.logger = logger;
// ✅ Add a stream compatible with Morgan
const stream = {
    write: (message) => {
        logger.http(message.trim());
    },
};
exports.stream = stream;
