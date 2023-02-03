import { createContext, useState } from "react";
import { useLocalStorageState } from "./hooks/useLocalStorageState";

export const Context = createContext(null);

export function ContextProvider({ children }) {
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

  return (
    <Context.Provider value={{ categoriesIncome, categoriesExpense }}>
      {children}
    </Context.Provider>
  );
}
