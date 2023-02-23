import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../models/Category";
import { v4 as uuidv4 } from "uuid";
import { CategoryType } from "../models/CategoryType";
import { categoriesInitialState } from "./initialState";

const initialState = categoriesInitialState;

try {
  const categoriesInLocalStorage = JSON.parse(
    localStorage.getItem("categories")
  );
  if (categoriesInLocalStorage) {
    initialState.categories = categoriesInLocalStorage;
  }
} catch {
  console.error("The categories could not be parsed into JSON.");
}

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    updateSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },

    updateCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.map((c: Category) =>
        c.id === state.currentEditingCategory?.id
          ? { ...c, name: action.payload }
          : c
      );
    },

    addCategory: (state, action: PayloadAction<string>) => {
      const type =
        state.selectedTab === "income"
          ? CategoryType.Income
          : CategoryType.Expense;
      state.categories = [
        ...state.categories,
        { id: uuidv4(), name: action.payload, type: type },
      ];
    },

    deleteCategory: (state) => {
      state.categories = state.categories.filter(
        (c: Category) => c.id !== state.currentDeletingCategory?.id
      );
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
