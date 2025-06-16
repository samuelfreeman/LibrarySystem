import { Request, Response, Errback } from "express";

import ExpressRes from "@server/Utils/Res";
import { loginAdminInput, RegisterAdminInput } from "@server/validators/admin.validator";
import { login, registerAdmin } from "@server/services/Admin.service";
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
         await  sendMail(admin.email, "Login Notification", otpEmail(admin.otp, admin.username))
      
        ExpressRes.success(res, "Admin otp sent successfully", { ...admin });
    } catch (error: any) {
        ExpressRes.error(res, "Failed to login admin", error.message);

    }
}



export { register, loginAdmin }