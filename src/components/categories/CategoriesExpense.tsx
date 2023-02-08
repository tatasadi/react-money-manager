import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ExpandableList from "../ExpandableList";

export default function CategoriesExpense() {
  const { categoriesExpense, setEditCategoryModalOpen, setCategoryNameToEdit } =
    useContext(CategoriesContext);

  function handleEdit(item) {
    setCategoryNameToEdit(item.name);
    setEditCategoryModalOpen(true);
  }

  return (
    <div>
      <ExpandableList
        items={categoriesExpense}
        onEdit={(item) => handleEdit(item)}
      />
    </div>
  );
}
