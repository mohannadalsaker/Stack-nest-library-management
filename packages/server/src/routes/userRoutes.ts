import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/profile", authenticate, userController.getProfile);

export { router as userRoutes };
