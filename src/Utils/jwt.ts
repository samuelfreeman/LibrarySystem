// utils/jwt.ts
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ExpressRes from "./Res";
dotenv.config()
const JWT_SECRET = process.env.JWT_SECRET!
export const signToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};

export const decodeToken = (token: string): any => {
    return jwt.decode(token);
};