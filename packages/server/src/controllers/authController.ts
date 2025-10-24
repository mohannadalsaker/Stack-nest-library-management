import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import * as authService from "../services/authService";

export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
        token,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      error: error.message,
    });
  }
};
