import { Router } from "express";
import * as bookController from "../controllers/bookController";
import { upload } from "../utils/multerConfig";

const router = Router();
router.get("/", bookController.getAllBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id/changeStatus", bookController.changeBookStatus);
router.delete("/:id", bookController.deleteBook);
router.post("/", upload.single("coverImage"), bookController.createBook);
router.put("/:id", upload.single("coverImage"), bookController.updateBook);

export { router as bookRoutes };
