import { Book } from "../models/Book";
import { BookStatus, type BookFilters } from "../types/bookTypes";
import type {
  CreateBookInput,
  UpdateBookInput,
} from "../validators/bookValidator";
import { emailService } from "./emailService";

export const getAllBooks = async ({
  q,
  skip,
  limit,
  ...filters
}: {
  q: string;
  skip: number;
  limit: number;
} & Partial<BookFilters>) => {
  const filterQuery: Record<string, any> = {};

  console.log("search is: ", q);

  if (q) {
    filterQuery.$or = [
      { title: { $regex: q, $options: "i" } },
      { author: { $regex: q, $options: "i" } },
      { isbn: { $regex: q, $options: "i" } },
    ];
  }

  // Apply filters dynamically
  if (filters.category) {
    filterQuery.category = filters.category;
  }
  if (filters.subCategory) {
    filterQuery.subCategory = filters.subCategory;
  }
  if (filters.status) {
    filterQuery.status = filters.status;
  }
  if (filters.rating) {
    filterQuery.rating = { $gte: Number(filters.rating) };
  }

  // Quantity filters
  const availableQtyRange: Record<string, number> = {};
  if (filters.minAvailableQty) {
    availableQtyRange.$gte = Number(filters.minAvailableQty);
  }
  if (filters.maxAvailableQty) {
    availableQtyRange.$lte = Number(filters.maxAvailableQty);
  }
  if (Object.keys(availableQtyRange).length > 0) {
    filterQuery.availableQuantity = availableQtyRange;
  }

  const totalQtyRange: Record<string, number> = {};
  if (filters.minTotalQty) {
    totalQtyRange.$gte = Number(filters.minTotalQty);
  }
  if (filters.maxTotalQty) {
    totalQtyRange.$lte = Number(filters.maxTotalQty);
  }
  if (Object.keys(totalQtyRange).length > 0) {
    filterQuery.totalQuantity = totalQtyRange;
  }

  const [books, total] = await Promise.all([
    Book.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("subCategory"),
    Book.countDocuments(filterQuery),
  ]);

  return {
    data: books,
    total,
  };
};

export const findBookById = async (id: string) => {
  const book = await Book.findById(id)
    .populate("category")
    .populate("subCategory");
  if (!book) throw new Error("Book not found");
  return book;
};

export const createBook = async (bookData: CreateBookInput) => {
  const newBook = new Book(bookData);
  const savedBook = await newBook.save();
  await savedBook.populate(["category", "subCategory"]);
  try {
    await emailService.sendNewBookNotification(
      savedBook.title,
      "Library System"
    );
  } catch (emailError) {
    console.error("Failed to send notification email:", emailError);
  }

  return savedBook;
};

export const updateBook = async ({
  bookData,
  id,
}: {
  bookData: UpdateBookInput;
  id: string;
}) => {
  const updatedBook = await Book.findByIdAndUpdate(id, bookData, {
    new: true,
  })
    .populate("category")
    .populate("subCategory");
  if (!updatedBook) throw new Error("Book not found");
  return updatedBook;
};

export const changeBookStatus = async (id: string) => {
  const book = await findBookById(id);
  const newStatus =
    book?.status === BookStatus.archived
      ? BookStatus.available
      : BookStatus.archived;
  await Book.findByIdAndUpdate(
    id,
    {
      status: newStatus,
    },
    { new: true }
  );
};

export const deleteBook = async (id: string) => {
  await findBookById(id);
  return await Book.deleteOne({ _id: id });
};
