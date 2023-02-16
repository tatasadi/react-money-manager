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
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [selectedTab, setSelectedTab] = useState("income");

  function updateSelectedTab(newTab: string) {
    setSelectedTab(newTab);
  }

  function updateEditCategoryModalOpen(isOpen: boolean) {
    setEditCategoryModalOpen(isOpen);
  }

  function editCategory(category) {
    setCategoryToEdit(category);
  }

  function updateCategory(newCategoryName) {
    switch (selectedTab) {
      case "income":
        setCategoriesIncome((prevCategories) =>
          prevCategories.map((c) =>
            c.id === categoryToEdit.id ? { ...c, name: newCategoryName } : c
          )
        );
        break;
      case "expense":
        setCategoriesExpense((prevCategories) =>
          prevCategories.map((c) =>
            c.id === categoryToEdit.id ? { ...c, name: newCategoryName } : c
          )
        );
        break;
    }
    console.log(selectedTab, newCategoryName, categoryToEdit);
  }

  return (
    <CategoriesContext.Provider
      value={{
        categoriesIncome,
        categoriesExpense,
        editCategoryModalOpen,
        updateEditCategoryModalOpen,
        categoryToEdit,
        editCategory,
        updateCategory,
        selectedTab,
        updateSelectedTab,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
