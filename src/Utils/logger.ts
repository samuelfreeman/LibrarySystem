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
    winston.format.printf(({ level, message, timestamp }) => {
      const msg = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
      return `[${timestamp}] ${level}: ${msg}`;
    })
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    // ✅ Pretty output for terminal
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(), // Only for console
        winston.format.simple()
      ),
    }),

  
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          const msg = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
          return `[${timestamp}] ${level}: ${msg}`;
        })
      ),
    }),

    new winston.transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
  ],
});
const otpLogger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const msg = typeof message === "object" ? JSON.stringify(message, null, 2) : message;
      return `[${timestamp}] ${level}: ${msg}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "otp.log") }),
  ],
});


// ✅ Add a stream compatible with Morgan
const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

export { logger, stream, otpLogger };
