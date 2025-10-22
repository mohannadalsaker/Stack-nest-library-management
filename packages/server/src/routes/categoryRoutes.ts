import { Router } from "express";
import * as categoryController from "../controllers/categoryController";
import { validate } from "../middleware/validation";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/categoryValidator";

const router = Router();
router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategoryById);
router.post(
  "/",
  validate(createCategorySchema),
  categoryController.createCategory
);
router.put(
  "/:id",
  validate(updateCategorySchema),
  categoryController.updatedCategory
);
router.delete("/:id", categoryController.deleteCategory);

export { router as categoryRoutes };
