import { Router } from "express";
import * as bookController from "../controllers/bookController";
import { upload } from "../utils/multerConfig";
import { authenticate } from "../middleware/auth";
import { requireArchiver, requireDataEntry } from "../middleware/roles";

const router = Router();
router.get("/search", authenticate, bookController.getAllBooks);
router.get("/:id", authenticate, requireDataEntry, bookController.getBookById);
router.put(
  "/:id/changeStatus",
  authenticate,
  requireArchiver,
  bookController.changeBookStatus
);
router.delete(
  "/:id",
  authenticate,
  requireDataEntry,
  bookController.deleteBook
);
router.post(
  "/",
  authenticate,
  requireDataEntry,
  upload.single("coverImage"),
  bookController.createBook
);
router.put(
  "/:id",
  authenticate,
  requireDataEntry,
  upload.single("coverImage"),
  bookController.updateBook
);

export { router as bookRoutes };
