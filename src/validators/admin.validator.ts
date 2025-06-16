// validators/adminSchema.ts
import { z } from "zod";

export const registerAdminSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    contact: z.string().min(10),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});


export const loginAdminSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});


export const OtpSchema = z.object({
    otp: z.number().min(6),
    username: z.string().min(3)
})

export const resetPasswordSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6)
})

export const forgotPasswordSchema = z.object({
    username: z.string().min(3)
})

export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;
export type loginAdminInput = z.infer<typeof loginAdminSchema>;
export type OtpInput = z.infer<typeof OtpSchema>;
export type forgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type resetPasswordInput = z.infer<typeof resetPasswordSchema>;