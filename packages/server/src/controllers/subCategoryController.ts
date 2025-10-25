import type { Response } from "express";
import * as subCategoryService from "../services/subCategoryService";
import type { AuthRequest } from "../middleware/auth";

export const getAllSubCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { categoryId, q, skip, limit } = req.query as {
      q: string;
      skip: string;
      limit: string;
      categoryId?: string;
    };
    const query = {
      ...(categoryId ? { categoryId: categoryId } : {}),
      q,
      skip: Number(skip),
      limit: Number(limit),
    };
    const subCategories = await subCategoryService.findSubCategories(query);
    res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getSubCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const subCategory = await subCategoryService.findSubCategoryById(
      id as string
    );
    res.status(200).json({
      success: true,
      data: subCategory,
    });
  } catch (error: any) {
    if (error.message === "Sub category not found") {
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

export const createSubCategory = async (req: AuthRequest, res: Response) => {
  try {
    const body = req.body;
    await subCategoryService.createSubCategory(body);
    res.status(200).json({
      success: true,
      data: { message: "Sub category Created" },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const updateSubCategory = async (req: AuthRequest, res: Response) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const newSubCategory = await subCategoryService.updateSubCategory({
      subCategoryInput: body,
      id: id as string,
    });
    res.status(200).json({
      success: true,
      data: newSubCategory,
    });
  } catch (error: any) {
    if (error.message === "Sub category not found") {
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

export const deleteSubCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await subCategoryService.deleteSubCategory(id as string);
    res.status(201).json({
      success: true,
      data: { message: "Sub category Deleted" },
    });
  } catch (error: any) {
    if (error.message === "Sub category not found") {
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
