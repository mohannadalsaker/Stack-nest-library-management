import type { Request, Response, NextFunction } from "express";
import { ZodType, ZodError } from "zod";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // Flatten errors into a nice structure
        const formatted = err.flatten();

        return res.status(400).json({
          success: false,
          error: "Validation failed",
          details: formatted.fieldErrors, // key: field, value: array of messages
        });
      }

      // fallback for unexpected errors
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  };
};
