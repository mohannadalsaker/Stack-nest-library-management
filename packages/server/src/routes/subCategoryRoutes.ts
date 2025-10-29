import { Router } from "express";
import * as subCategoryController from "../controllers/subCategoryController";
import { validate } from "../middleware/validation";
import {
  createSubCategorySchema,
  updateSubCategorySchema,
} from "../validators/subCategoryValidator";
import { requireDataEntry } from "../middleware/roles";
import { authenticate } from "../middleware/auth";

const router = Router();
router.get("/", authenticate, subCategoryController.getAllSubCategories);
router.get("/search", authenticate, subCategoryController.getAllSubCategories);
router.get(
  "/:id",
  authenticate,
  requireDataEntry,
  subCategoryController.getSubCategoryById
);
router.post(
  "/",
  authenticate,
  requireDataEntry,
  validate(createSubCategorySchema),
  subCategoryController.createSubCategory
);
router.put(
  "/:id",
  authenticate,
  requireDataEntry,
  validate(updateSubCategorySchema),
  subCategoryController.updateSubCategory
);
router.delete(
  "/:id",
  authenticate,
  requireDataEntry,
  subCategoryController.deleteSubCategory
);

export { router as subCategoryRoutes };
