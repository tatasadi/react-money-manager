import { Category } from "./Category";

export interface CategoriesState {
  selectedTab: string;
  categories: Category[];
  currentEditingCategory?: Category;
  currentDeletingCategory?: Category;
}
