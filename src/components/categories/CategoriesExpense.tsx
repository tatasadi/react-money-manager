import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ExpandableList from "../ExpandableList";

export default function CategoriesExpense() {
  const { categoriesExpense, updateEditCategoryModalOpen, editCategory } =
    useContext(CategoriesContext);

  function handleEdit(item) {
    editCategory(item);
    updateEditCategoryModalOpen(true);
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
