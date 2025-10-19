import type { Request, Response } from "express";
import * as bookService from "../services/bookService";
import type { BookStatus } from "../types/bookTypes";
import {
  createBookSchema,
  updateBookSchema,
} from "../validators/bookValidator";

const parseBookData = (body: any) => {
  const parsedData: any = { ...body };

  // Convert string numbers to actual numbers
  if (body.rating) parsedData.rating = Number(body.rating);
  if (body.availableQuantity)
    parsedData.availableQuantity = Number(body.availableQuantity);
  if (body.totalQuantity) parsedData.totalQuantity = Number(body.totalQuantity);

  // Remove file-related fields that are not in the schema
  delete parsedData.isDeleteImage;

  return parsedData;
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { status } = req.query as { status?: BookStatus };
    const books = await bookService.getAllBooks({
      ...(status ? { status } : {}),
    });

    res.status(200).json({
      success: true,
      data: { books },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await bookService.findBookById(id as string);
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error: any) {
    if (error.message === "Book not found") {
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

export const createBook = async (req: Request, res: Response) => {
  try {
    // Parse the form data
    const parsedData = parseBookData(req.body);

    // Handle file path if file was uploaded
    const coverImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    // Validate the data with Zod
    const validatedData = createBookSchema.parse({
      ...parsedData,
      coverImage,
    });

    const book = await bookService.createBook(validatedData);

    res.status(201).json({
      success: true,
      data: book, // Return the created book with populated fields
    });
  } catch (error: any) {
    // Handle Zod validation errors
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
    }
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const parsedData = parseBookData(req.body);

    // Handle cover image logic
    let coverImage: string | undefined;

    if (req.file) {
      // New file uploaded
      coverImage = `/uploads/${req.file.filename}`;
    } else if (req.body.isDeleteImage === "1") {
      // Mark for deletion
      coverImage = undefined;
    }
    // If neither, coverImage remains unchanged (will not be included in update)

    // Prepare data for validation
    const updateData: any = { ...parsedData };
    if (coverImage !== undefined) {
      updateData.coverImage = coverImage;
    }

    // Validate the data with Zod
    const validatedData = updateBookSchema.parse(updateData);

    const updatedBook = await bookService.updateBook({
      bookData: validatedData,
      id: id as string,
    });

    res.status(200).json({
      success: true,
      data: updatedBook,
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.errors,
      });
    }
    if (error.message === "Book not found") {
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
export const changeBookStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await bookService.changeBookStatus(id as string);
    res.status(201).json({
      success: true,
      data: { message: "Status Changed" },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id as string);

    res.status(201).json({
      success: true,
      data: { message: "Book Deleted" },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
