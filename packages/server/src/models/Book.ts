import mongoose, { Schema, type Document } from "mongoose";
import { BookStatus } from "../types/bookTypes";

export interface IBook extends Document {
  title: string;
  description: string;
  coverImage: string;
  author: string;
  publishDate: string;
  rating: number;
  isbn: string;
  category: mongoose.Types.ObjectId;
  subCategory: mongoose.Types.ObjectId;
  status: BookStatus;
  location: string;
  notes: string;
  availableQuantity: number;
  totalQuantity: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    description: { type: String },
    coverImage: { type: String },
    author: { type: String, required: true },
    rating: { type: Number },
    isbn: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    status: {
      type: String,
      enum: BookStatus,
      default: BookStatus.available,
    },
    location: { type: String },
    notes: { type: String },
    availableQuantity: { type: Number, default: 0 },
    totalQuantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model<IBook>("Book", bookSchema);
