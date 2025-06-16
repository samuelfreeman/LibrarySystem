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

export type RegisterAdminInput = z.infer<typeof registerAdminSchema>;

export const loginAdminSchema = z.object({
    username: z.string().min(3),
    password: z.string().min(6),
});

export type loginAdminInput = z.infer<typeof loginAdminSchema>;