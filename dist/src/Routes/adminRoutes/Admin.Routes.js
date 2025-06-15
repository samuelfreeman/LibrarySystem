"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Admin_controller_1 = require("../../Controllers/Admin.controller");
const admin_validator_1 = require("../../validators/admin.validator");
const ErrorValidator_1 = require("@server/middleware/validation/ErrorValidator");
const router = (0, express_1.Router)();
router.post("/register", (0, ErrorValidator_1.validateError)(admin_validator_1.registerAdminSchema), Admin_controller_1.register);
exports.default = router;
