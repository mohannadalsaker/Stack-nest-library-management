import type { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth";

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: "Authentication required.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: "Insufficient permissions.",
      });
    }

    next();
  };
};

// Specific role middlewares for convenience
export const requireAdmin = requireRole(["ADMIN"]);
export const requireLibrarian = requireRole(["LIBRARIAN", "ADMIN"]);
export const requireMember = requireRole(["MEMBER", "LIBRARIAN", "ADMIN"]);
