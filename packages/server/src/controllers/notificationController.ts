// server/src/controllers/notificationController.ts
import type { Request, Response } from "express";
import { Book } from "../models/Book";

export const getArchivingNotifications = async (
  _req: Request,
  res: Response
) => {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const booksNeedingArchiving = await Book.find({
      availableQuantity: 0,
      totalQuantity: 0,
      status: "AVAILABLE",
      updatedAt: { $lt: threeMonthsAgo },
    }).limit(10);

    res.json({
      success: true,
      data: {
        data: booksNeedingArchiving,
        total: booksNeedingArchiving.length,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
