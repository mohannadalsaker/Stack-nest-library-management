import { Router } from "express";
import { validate } from "../middleware/validation";
import { createUserSchema, loginSchema } from "../validators/userValidator";
import * as authController from "../controllers/authController";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);

export { router as authRoutes };
