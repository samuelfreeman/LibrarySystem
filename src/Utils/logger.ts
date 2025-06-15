// utils/logger.ts
import winston from "winston";
import path from "path";
import fs from "fs";

// Ensure logs directory exists
const logDir = path.join(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

// Create logger
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) =>
      `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({ filename: path.join(logDir, "combined.log") }),
    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
  ],
});

// ✅ Add a stream compatible with Morgan
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export { logger, stream };
