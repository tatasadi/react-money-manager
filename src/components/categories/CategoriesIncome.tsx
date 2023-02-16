import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ExpandableList from "../ExpandableList";

export default function CategoriesIncome() {
  const { categoriesIncome, updateEditCategoryModalOpen, editCategory } =
    useContext(CategoriesContext);

  function handleEdit(item) {
    editCategory(item);
    updateEditCategoryModalOpen(true);
  }

  return (
    <div>
      <ExpandableList
        items={categoriesIncome}
        onEdit={(item) => handleEdit(item)}
      />
    </div>
  );
}
