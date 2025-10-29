interface BaseOptionData {
  _id: string;
  name: string;
}

export interface BooksData {
  _id: string;
  title: string;
  description: string;
  author: string;
  rating: number;
  isbn: string;
  coverImage?: string;
  category: {
    _id: string;
    name: string;
  };
  subCategory: {
    _id: string;
    name: string;
  };
  status: BookStatus;
  location: string;
  notes: string;
  availableQuantity: number;
  totalQuantity: number;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface BooksTableRow {
  id: string;
  title: string;
  author: string;
  status: BookStatus;
  image?: string;
  category: string;
  subCategory: string;
  isbn: string;
  availableQty: number;
  totalQty: number;
  createdAt: string;
  updatedAt: string;
}

export interface SingleBookData extends BooksData {}

export interface CategoryData extends BaseOptionData {}

export interface SubCategoryData extends BaseOptionData {}

export enum BookStatus {
  archived = "ARCHIVED",
  available = "AVAILABLE",
}

export interface BookFilters {
  category: string;
  subCategory: string;
  minAvailableQty: string;
  minTotalQty: string;
  maxAvailableQty: string;
  maxTotalQty: string;
  status: BookStatus;
  rating: string;
}

export interface ArchivingBooksData
  extends Omit<BooksData, "category" | "subCategory"> {}
