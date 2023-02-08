import { createContext, useState } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export const CategoriesContext = createContext(null);

export function CategoriesContextProvider({ children }) {
  const [categoriesIncome, setCategoriesIncome] = useLocalStorageState(
    "budget_app_categories_expense",
    [
      { id: 1, name: "Salary" },
      { id: 2, name: "Financial Income" },
      { id: 3, name: "Other (Income)" },
    ]
  );
  const [categoriesExpense, setCategoriesExpense] = useLocalStorageState(
    "budget_app_categories_income",
    [
      { id: 1, name: "Home" },
      { id: 2, name: "Supermarket" },
      { id: 3, name: "Eating Out" },
      { id: 4, name: "Clothing" },
      { id: 5, name: "Health" },
      { id: 6, name: "Travel" },
      { id: 7, name: "Transportation" },
      { id: 8, name: "Gift" },
      { id: 9, name: "Other (Expense)" },
    ]
  );

  const [editCategoryModalOpen, setEditCategoryModalOpen] = useState(false);
  const [categoryNameToEdit, setCategoryNameToEdit] = useState("");

  return (
    <CategoriesContext.Provider
      value={{
        categoriesIncome,
        categoriesExpense,
        editCategoryModalOpen,
        setEditCategoryModalOpen,
        categoryNameToEdit,
        setCategoryNameToEdit,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
