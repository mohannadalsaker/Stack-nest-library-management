import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { validate } from "../middleware/validation";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/categoryValidator";
import { requireDataEntry } from "../middleware/roles";
import { authenticate } from "../middleware/auth";

const router = Router();
router.get("/search", authenticate, categoryController.getCategories);
router.get(
  "/:id",
  authenticate,
  requireDataEntry,
  categoryController.getCategoryById
);
router.post(
  "/",
  authenticate,
  requireDataEntry,
  validate(createCategorySchema),
  categoryController.createCategory
);
router.put(
  "/:id",
  authenticate,
  requireDataEntry,
  validate(updateCategorySchema),
  categoryController.updatedCategory
);
router.delete(
  "/:id",
  authenticate,
  requireDataEntry,
  categoryController.deleteCategory
);

export { router as categoryRoutes };
