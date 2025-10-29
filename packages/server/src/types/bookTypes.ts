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
