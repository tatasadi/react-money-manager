import { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";
import ExpandableList from "../ExpandableList";

export default function CategoriesIncome() {
  const { categoriesIncome, setEditCategoryModalOpen, setCategoryNameToEdit } =
    useContext(CategoriesContext);

  function handleEdit(item) {
    setCategoryNameToEdit(item.name);
    setEditCategoryModalOpen(true);
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
