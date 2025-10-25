import type { Request, Response } from "express";
import * as categoryService from "../services/categoryService";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const { q, skip, limit } = req.query as {
      q: string;
      skip: string;
      limit: string;
    };
    const query = {
      q,
      skip: Number(skip),
      limit: Number(limit),
    };
    const categories = await categoryService.getCategories(query);
    res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await categoryService.findCategoryById(id as string);
    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error: any) {
    if (error.message === "Category not found") {
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

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryService.deleteCategory(id as string);

    res.status(201).json({
      success: true,
      data: { message: "Category Deleted" },
    });
  } catch (error: any) {
    if (error.message === "Category not found") {
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
export const createCategory = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    await categoryService.createCategory(body);

    res.status(201).json({
      success: true,
      data: { message: "Category Created" },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
export const updatedCategory = async (req: Request, res: Response) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const updatedCategory = await categoryService.updateCategory({
      categoryInput: body,
      id: id as string,
    });

    res.status(200).json({
      success: true,
      data: updatedCategory,
    });
  } catch (error: any) {
    if (error.message === "Category not found") {
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
