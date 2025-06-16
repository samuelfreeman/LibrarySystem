import { Router } from "express";
import { loginAdmin, register, verifyOtp } from "../../Controllers/Admin.controller";
import { loginAdminSchema, OtpSchema, registerAdminSchema } from "../../validators/admin.validator";
import { validateError } from "@server/middleware/validation/ErrorValidator";
const router = Router();
router.post("/register", validateError(registerAdminSchema), register);
router.post("/login", validateError(loginAdminSchema), loginAdmin);
router.post("/verify-otp", validateError(OtpSchema), verifyOtp);
export default router;