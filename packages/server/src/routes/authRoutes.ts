import { Router } from "express";
import * as authController from "../controllers/authController";
import { validate } from "../middleware/validation";
import { loginSchema } from "../validators/userValidator";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);

export { router as authRoutes };
