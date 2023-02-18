import { v4 as uuidv4 } from "uuid";

export interface Category {
  id: string;
  name: string;
}

export interface CategoriesState {
  selectedTab: string;
  categoriesIncome: Category[];
  categoriesExpense: Category[];
  currentEditingCategory: Category;
}

export enum CategoriesActions {
  UpdateSelectedTab,
  UpdateCategory,
  UpdateCurrentEditingCategory,
}

export default function categoriesReducer(state: CategoriesState, action) {
  switch (action.type) {
    case CategoriesActions.UpdateSelectedTab:
      return { ...state, selectedTab: action.payload };
    case CategoriesActions.UpdateCategory:
      switch (state.selectedTab) {
        case "income":
          return {
            ...state,
            categoriesIncome: state.categoriesIncome.map((c) =>
              c.id === state.currentEditingCategory?.id
                ? { ...c, name: action.payload }
                : c
            ),
          };
        case "expense":
          return {
            ...state,
            categoriesExpense: state.categoriesExpense.map((c) =>
              c.id === state.currentEditingCategory?.id
                ? { ...c, name: action.payload }
                : c
            ),
          };
      }
    case CategoriesActions.AddCategory:
      switch (state.selectedTab) {
        case "income":
          return {
            ...state,
            categoriesIncome: [
              ...state.categoriesIncome,
              { id: uuidv4(), name: action.payload },
            ],
          };
        case "expense":
          return {
            ...state,
            categoriesExpense: [
              ...state.categoriesExpense,
              { id: uuidv4(), name: action.payload },
            ],
          };
      }
    case CategoriesActions.UpdateCurrentEditingCategory:
      return { ...state, currentEditingCategory: action.payload };
    default:
      throw new Error("Unhandled categories action " + action.type);
  }
}
