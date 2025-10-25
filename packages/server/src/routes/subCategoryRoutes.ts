import { Router } from "express";
import * as subCategoryController from "../controllers/subCategoryController";
import { validate } from "../middleware/validation";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
} from "../validators/subCategoryValidator";

const router = Router();
router.get("/search", subCategoryController.getAllSubCategories);
router.get("/:id", subCategoryController.getSubCategoryById);
router.post(
  "/",
  validate(createSubCategorySchema),
  subCategoryController.createSubCategory
);
router.put(
  "/:id",
  validate(updateSubCategorySchema),
  subCategoryController.updateSubCategory
);
router.delete("/:id", subCategoryController.deleteSubCategory);

export { router as subCategoryRoutes };
