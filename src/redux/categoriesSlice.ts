import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../models/Category";
import { v4 as uuidv4 } from "uuid";

export interface CategoriesState {
  selectedTab: string;
  categoriesIncome: Category[];
  categoriesExpenses: Category[];
  currentEditingCategory?: Category;
  currentDeletingCategory?: Category;
}

let initialState: CategoriesState = {
  selectedTab: "income",
  categoriesIncome: [
    { id: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed", name: "Salary" },
    { id: "434cd88f-288f-4aa0-a0f1-af6bee4d019e", name: "Financial Income" },
    { id: "09fe9af8-f9b0-4bf4-8fcf-673e1d4efc55", name: "Other (Income)" },
  ],
  categoriesExpenses: [
    { id: "1e671ae1-429c-4e7f-b4a9-7fad95202bd0", name: "Home" },
    { id: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb", name: "Supermarket" },
    { id: "30c38c18-ce5d-49f1-b5e2-15752613214b", name: "Eating Out" },
    { id: "b183cd0c-b5e6-46dc-844b-f49171d0d708", name: "Clothing" },
    { id: "e32c3003-dadf-4450-910a-151fb7e4bd6c", name: "Health" },
    { id: "db365832-0b17-4ce2-8797-3bc0ce8cf0b6", name: "Travel" },
    { id: "a992d9d0-2fb9-42dc-b012-4ba2e3df31a3", name: "Transportation" },
    { id: "adef755b-7a3b-41ef-806e-dee157245c6b", name: "Gift" },
    { id: "213de0f9-2d79-453d-82cc-95a1f192e58c", name: "Other (Expenses)" },
  ],
};

try {
  const categoriesIncomeInLocalStorage = JSON.parse(
    localStorage.getItem("categories_income")
  );
  if (categoriesIncomeInLocalStorage) {
    initialState.categoriesIncome = categoriesIncomeInLocalStorage;
  }
  const categoriesExpensesInLocalStorage = JSON.parse(
    localStorage.getItem("categories_expenses")
  );
  if (categoriesExpensesInLocalStorage) {
    initialState.categoriesExpenses = categoriesExpensesInLocalStorage;
  }
} catch {
  console.error("The categories could not be parsed into JSON.");
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<string>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.selectedTab = action.payload;
    },

    updateCategory: (state, action: PayloadAction<string>) => {
      switch (state.selectedTab) {
        case "income":
          state.categoriesIncome = state.categoriesIncome.map((c) =>
            c.id === state.currentEditingCategory?.id
              ? { ...c, name: action.payload }
              : c
          );
        case "expenses":
          state.categoriesExpenses = state.categoriesExpenses.map((c) =>
            c.id === state.currentEditingCategory?.id
              ? { ...c, name: action.payload }
              : c
          );
      }
    },

    addCategory: (state, action: PayloadAction<string>) => {
      switch (state.selectedTab) {
        case "income":
          state.categoriesIncome = [
            ...state.categoriesIncome,
            { id: uuidv4(), name: action.payload },
          ];
        case "expenses":
          state.categoriesExpenses = [
            ...state.categoriesExpenses,
            { id: uuidv4(), name: action.payload },
          ];
      }
    },

    deleteCategory: (state) => {
      switch (state.selectedTab) {
        case "income":
          state.categoriesIncome = state.categoriesIncome.filter(
            (c) => c.id !== state.currentDeletingCategory?.id
          );
        case "expenses":
          state.categoriesExpenses = state.categoriesExpenses.filter(
            (c) => c.id !== state.currentDeletingCategory?.id
          );
      }
    },

    updateCurrentEditingCategory: (state, action: PayloadAction<Category>) => {
      state.currentEditingCategory = action.payload;
    },
    updateCurrentDeletingCategory: (state, action: PayloadAction<Category>) => {
      state.currentDeletingCategory = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSelectedTab,
  addCategory,
  updateCategory,
  deleteCategory,
  updateCurrentEditingCategory,
  updateCurrentDeletingCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
