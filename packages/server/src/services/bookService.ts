import { Book } from "../models/Book";
import { BookStatus } from "../types/bookTypes";
import type {
  CreateBookInput,
  UpdateBookInput,
} from "../validators/bookValidator";

export const getAllBooks = async ({ status }: { status?: BookStatus }) => {
  const books = await Book.find(status ? { status } : {})
    .populate("category")
    .populate("subCategory");

  return books;
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
  return await savedBook.populate(["category", "subCategory"]);
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
