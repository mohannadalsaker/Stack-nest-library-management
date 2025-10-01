import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as userService from "../services/userService";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await userService.findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
