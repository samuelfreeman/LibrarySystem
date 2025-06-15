import { Router } from "express";
import adminRoutes from "@server/Routes/adminRoutes/Admin.Routes";
const mainRoute = Router();


mainRoute.use("/admin",adminRoutes)

export default mainRoute