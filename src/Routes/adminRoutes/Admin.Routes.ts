import { Router } from "express";
import { register } from "../../Controllers/Admin.controller";
import { registerAdminSchema } from "../../validators/admin.validator";
import { validateError } from "@server/middleware/validation/ErrorValidator";
const router = Router();
router.post("/register", validateError(registerAdminSchema), register);
export default router;