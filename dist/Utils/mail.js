"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpEmail = exports.sendMail = void 0;
// src/utils/mailer.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail', // or use 'smtp.mailtrap.io', etc.
    auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});
const sendMail = async (to, subject, html) => {
    await transporter.sendMail({
        from: `"Library System" <${process.env.SMTP_EMAIL}>`,
        to,
        subject,
        html,
    });
};
exports.sendMail = sendMail;
// src/templates/otpEmail.ts
const otpEmail = (otp, name) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
      <h2>Hello, ${name}</h2>
      <p>Your one-time password (OTP) is:</p>
      <div style="font-size: 24px; font-weight: bold; background: #eee; padding: 10px; display: inline-block; letter-spacing: 4px;">
        ${otp}
      </div>
      <p>This code will expire in 5 minutes. Please do not share this code with anyone.</p>
      <p style="color: gray;">— The Library Team</p>
    </div>
  `;
};
exports.otpEmail = otpEmail;
