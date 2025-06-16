import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { logger, stream } from "@server/Utils/logger";////
import mainRoutes from "@server/Routes/index";
import dotenv from "dotenv";
import ExpressRes from "@server/Utils/Res";


dotenv.config();
const app: Express = express();





app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: "*", // or ['https://yourdomain.com']
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(helmet());


app.use(morgan("combined", { stream }));
app.use(compression());


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);




app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use("/api", mainRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});


app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  ExpressRes.error(res, "Something went wrong", err, 500);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
