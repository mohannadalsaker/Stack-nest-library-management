import mongoose, { Schema, type Document } from "mongoose";

export interface ISubCategory extends Document {
  name: string;
  category: mongoose.Types.ObjectId;
}

const subCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SubCategory = mongoose.model<ISubCategory>(
  "SubCategory",
  subCategorySchema
);
