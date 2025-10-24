import type { Response, Request } from "express";
import type { AuthRequest } from "../middleware/auth";
import * as userService from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.findUserById(id as string);

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

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);

    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    res.status(201).json({
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
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
export const updateUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { id } = req.params;
    const user = await userService.updateUser({ id: id!, userData });

    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      },
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id as string);

    res.status(201).json({
      success: true,
      data: { message: "User Deleted" },
    });
  } catch (error: any) {
    if (error.message === "User not found") {
      return res.status(404).json({
        success: false,
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
