// middleware/validate.ts
import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import ExpressRes from "@server/Utils/Res";
export const validateError =
    (schema: ZodSchema<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req.body);

            if (!result.success) {
                ExpressRes.error(res, "Validation failed", result.error.format(), 400);
                return;
            }

            // Attach the validated data to request for later 
            req.body = result.data;
            next();
        };
