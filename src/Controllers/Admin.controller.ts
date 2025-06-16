import { Request, Response, Errback } from "express";

import ExpressRes from "@server/Utils/Res";
import { loginAdminInput, OtpInput, RegisterAdminInput, resetPasswordInput } from "@server/validators/admin.validator";
import { login, registerAdmin, sendOtp, updatePassword, verifyAdminOtp } from "@server/services/Admin.service";
import { signToken } from "@server/Utils/jwt";
import { otpEmail, sendMail } from "@server/Utils/mail";


const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = req.body as RegisterAdminInput;
        const admin = await registerAdmin(input);
        const token = signToken({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });
        ExpressRes.success(res, "Admin registered successfully", { ...admin, token });
    } catch (error: any) {

        ExpressRes.error(res, "Failed to register admin", error.message);
    }
};
const loginAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = req.body as loginAdminInput;
        const admin = await login(input)
        const token = signToken({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });

        ExpressRes.success(res, "Admin otp sent successfully", { ...admin, token });
    } catch (error: any) {
        ExpressRes.error(res, "Failed to login admin", error.message);

    }
}
const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = req.body as OtpInput;
        const admin = await sendOtp(input.username)
        await sendMail(admin.email, "Login Notification", otpEmail(admin.otp, admin.username))
        ExpressRes.success(res, "Otp sent successfully");
    } catch (error: any) {
        ExpressRes.error(res, "Failed to send otp", error.message);
    }
}


const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = req.body as OtpInput;
        const admin = await verifyAdminOtp(input.otp, input.username)
        const token = signToken({
            id: admin.id,
            email: admin.email,
            username: admin.username,
        });
        ExpressRes.Otpsuccess(res, "Admin otp verified  successfully", { ...admin, token });
    } catch (error: any) {
        ExpressRes.error(res, "Failed to  verify otp", error.message);
    }
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
        const input = req.body as resetPasswordInput;
        const admin = await updatePassword(input.username, input.password)
        ExpressRes.success(res, "Admin successfully updated password", { ...admin })
    } catch (error: any) {
        ExpressRes.error(res, "Failed to update Admin Password", error.message)
    }
}



export { register, loginAdmin, verifyOtp, forgotPassword,resetPassword }