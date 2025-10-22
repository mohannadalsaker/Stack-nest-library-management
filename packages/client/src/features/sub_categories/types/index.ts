export interface SubCategoriesData {
  _id: string;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SubCategoriesTableRow {
  id: string;
  name: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface SingleSubCategoryData extends SubCategoriesData {}

export interface CategoryData {
  _id: string;
  name: string;
}
