"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const logger_1 = require("@server/Utils/logger"); ////
const index_1 = __importDefault(require("@server/Routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const Res_1 = __importDefault(require("@server/Utils/Res"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.set("trust proxy", true);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)("combined", { stream: logger_1.stream }));
app.use((0, compression_1.default)());
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api", index_1.default);
app.use((req, res) => {
    res.status(404).json({ error: "Route not found" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    Res_1.default.error(res, "Something went wrong", err, 500);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger_1.logger.info(`Server is running on port ${PORT}`);
});
