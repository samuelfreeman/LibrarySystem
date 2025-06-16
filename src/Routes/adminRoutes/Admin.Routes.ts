import { Router } from "express";
import { loginAdmin, register } from "../../Controllers/Admin.controller";
import { loginAdminSchema, registerAdminSchema } from "../../validators/admin.validator";
import { validateError } from "@server/middleware/validation/ErrorValidator";
const router = Router();
router.post("/register", validateError(registerAdminSchema), register);
router.post("/login", validateError(loginAdminSchema), loginAdmin)
export default router;