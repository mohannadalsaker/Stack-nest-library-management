import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware/auth";
import { requireAdmin } from "../middleware/roles";

const router = Router();

router.get("/profile", authenticate, userController.getProfile);
router.get("/search", authenticate, requireAdmin, userController.getAllUsers);
router.post("/", authenticate, requireAdmin, userController.createUser);
router.put("/:id", authenticate, requireAdmin, userController.updateUser);
router.delete("/:id", authenticate, requireAdmin, userController.deleteUser);
router.get("/:id", authenticate, requireAdmin, userController.getUserById);

export { router as userRoutes };
