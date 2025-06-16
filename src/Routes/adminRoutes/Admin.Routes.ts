import { Router } from "express";
import { forgotPassword, loginAdmin, register, resetPassword, verifyOtp } from "../../Controllers/Admin.controller";
import { forgotPasswordSchema, loginAdminSchema, OtpSchema, registerAdminSchema, resetPasswordSchema } from "../../validators/admin.validator";
import { validateError } from "@server/middleware/validation/ErrorValidator";
const router = Router();
router.post("/register", validateError(registerAdminSchema), register);
router.post("/login", validateError(loginAdminSchema), loginAdmin);
router.post("/verify-otp", validateError(OtpSchema), verifyOtp);
router.post ("/forgot-password",validateError(forgotPasswordSchema),forgotPassword)
router.patch("/resetPassword",validateError(resetPasswordSchema),resetPassword)
export default router;