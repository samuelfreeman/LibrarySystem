import { Request, Response } from "express";
import ExpressRes from "@server/Utils/Res";
import { RegisterAdminInput } from "@server/validators/admin.validator";
import { registerAdmin } from "@server/services/Admin.service";
import { signToken } from "@server/Utils/jwt";


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
    } catch (error:any) {

        ExpressRes.error(res, "Failed to register admin", error.message);
    }
};




export { register }