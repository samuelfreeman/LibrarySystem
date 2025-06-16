"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../Utils/logger");
class ExpressRes {
    static success(res, message = "Success", data = null, statusCode = 200) {
        logger_1.logger.info(` ${message}`, { statusCode, data });
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    static Otpsuccess(res, message = "Success", data = null, statusCode = 200) {
        logger_1.otpLogger.info(` ${message}`, { statusCode, data });
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    static error(res, message = "Something went wrong", error = null, statusCode = 500) {
        logger_1.logger.error(` ${message}`, { statusCode, error });
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        });
    }
    static notFound(res, message = "Resource not Found!", error = null, statusCode = 404) {
        logger_1.logger.warn(` ${message}`, { statusCode, error });
        return res.status(statusCode).json({
            success: false,
            message,
            error,
        });
    }
    static custom(res, payload) {
        const { success = true, message = success ? "Success" : "Failed", data = null, error = null, statusCode = payload.statusCode || (success ? 200 : 500), } = payload;
        const logPayload = { statusCode, ...(data && { data }), ...(error && { error }) };
        if (success) {
            logger_1.logger.info(`${message}`, logPayload);
        }
        else {
            logger_1.logger.error(`${message}`, logPayload);
        }
        return res.status(statusCode).json({
            success,
            message,
            ...(data !== null && { data }),
            ...(error !== null && { error }),
        });
    }
}
exports.default = ExpressRes;
