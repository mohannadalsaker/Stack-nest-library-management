// server/src/routes/notificationRoutes.ts
import { Router } from "express";
import { getArchivingNotifications } from "../controllers/notificationController";

const router = Router();

router.get("/archiving", getArchivingNotifications);

export { router as notificationRoutes };
