import { createContext, useContext, useEffect, useReducer } from "react";
import categoriesReducer, {
  CategoriesState,
} from "../reducers/categoriesReducer";

const CategoriesContext = createContext(null);

let initialCategoriesState: CategoriesState = {
  selectedTab: "income",
  categoriesIncome: [
    { id: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed", name: "Salary" },
    { id: "434cd88f-288f-4aa0-a0f1-af6bee4d019e", name: "Financial Income" },
    { id: "09fe9af8-f9b0-4bf4-8fcf-673e1d4efc55", name: "Other (Income)" },
  ],
  categoriesExpense: [
    { id: "1e671ae1-429c-4e7f-b4a9-7fad95202bd0", name: "Home" },
    { id: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb", name: "Supermarket" },
    { id: "30c38c18-ce5d-49f1-b5e2-15752613214b", name: "Eating Out" },
    { id: "b183cd0c-b5e6-46dc-844b-f49171d0d708", name: "Clothing" },
    { id: "e32c3003-dadf-4450-910a-151fb7e4bd6c", name: "Health" },
    { id: "db365832-0b17-4ce2-8797-3bc0ce8cf0b6", name: "Travel" },
    { id: "a992d9d0-2fb9-42dc-b012-4ba2e3df31a3", name: "Transportation" },
    { id: "adef755b-7a3b-41ef-806e-dee157245c6b", name: "Gift" },
    { id: "213de0f9-2d79-453d-82cc-95a1f192e58c", name: "Other (Expense)" },
  ],
};

try {
  const categoriesIncomeInLocalStorage = JSON.parse(
    localStorage.getItem("categories_income")
  );
  if (categoriesIncomeInLocalStorage) {
    initialCategoriesState.categoriesIncome = categoriesIncomeInLocalStorage;
  }
  const categoriesExpenseInLocalStorage = JSON.parse(
    localStorage.getItem("categories_expense")
  );
  if (categoriesExpenseInLocalStorage) {
    initialCategoriesState.categoriesExpense = categoriesExpenseInLocalStorage;
  }
} catch {
  console.error("The categories could not be parsed into JSON.");
}

export function CategoriesProvider({ children }) {
  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );

  useEffect(
    () =>
      localStorage.setItem(
        "categories_income",
        JSON.stringify(categoriesState.categoriesIncome)
      ),
    [categoriesState.categoriesIncome]
  );

  useEffect(
    () =>
      localStorage.setItem(
        "categories_expense",
        JSON.stringify(categoriesState.categoriesExpense)
      ),
    [categoriesState.categoriesExpense]
  );

  return (
    <CategoriesContext.Provider value={{ categoriesState, categoriesDispatch }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error(
      "useCategories must be used within a CategoriesProvider. Wrap a parent component in <CategoriesProvider> to fix this error."
    );
  }
  return context;
}
