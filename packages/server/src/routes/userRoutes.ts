import { Router } from "express";
import * as userController from "../controllers/userController";
import { authenticate } from "../middleware/auth";

const router = Router();

router.get("/profile", authenticate, userController.getProfile);
router.get("/search", userController.getAllUsers);
router.post("/", userController.createUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.get("/:id", userController.getUserById);

export { router as userRoutes };
