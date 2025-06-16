// src/utils/mailer.ts
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'smtp.mailtrap.io', etc.
  auth: {
    user: process.env.SMTP_EMAIL!,
    pass: process.env.SMTP_PASSWORD!,
  },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  await transporter.sendMail({
    from: `"Library System" <${process.env.SMTP_EMAIL}>`,
    to,
    subject,
    html,
  });
};



// src/templates/otpEmail.ts
export const otpEmail = (otp: number, name: string) => {
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
