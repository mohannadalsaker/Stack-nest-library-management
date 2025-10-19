import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { authRoutes } from "./authRoutes";
import { bookRoutes } from "./bookRoutes";
import { categoryRoutes } from "./categoryRoutes";
import { subCategoryRoutes } from "./subCategoryRoutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/books", bookRoutes);
router.use("/category", categoryRoutes);
router.use("/subCategory", subCategoryRoutes);

export { router as apiRoutes };
