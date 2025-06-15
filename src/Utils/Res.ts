import { Response } from "express";
import { logger } from "@server/Utils/logger";
interface IResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: any;
  statusCode?: number;
}
export default class ExpressRes {
  static success(res: Response, message = "Success", data: any = null, statusCode = 200) {
    logger.info(` ${message}`, { statusCode, data });
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  }

  static error(res: Response, message = "Something went wrong", error: any = null, statusCode = 500) {
    logger.error(` ${message}`, { statusCode, error });
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }

  static notFound(res: Response, message = "Resource not Found!", error: any = null, statusCode = 404) {
    logger.warn(` ${message}`, { statusCode, error });
    return res.status(statusCode).json({
      success: false,
      message,
      error,
    });
  }

  static custom(res: Response, payload: IResponse) {
    const {
      success = true,
      message = success ? "Success" : "Failed",
      data = null,
      error = null,
      statusCode = payload.statusCode || (success ? 200 : 500),
    } = payload;

    const logPayload = { statusCode, ...(data && { data }), ...(error && { error }) };
    if (success) {
      logger.info(`${message}`, logPayload);
    } else {
      logger.error(`${message}`, logPayload);
    }

    return res.status(statusCode).json({
      success,
      message,
      ...(data !== null && { data }),
      ...(error !== null && { error }),
    });
  }
}
