import { useEffect } from "react";
import { useCategories } from "../../contexts/categoriesContext";
import { useEditInputModal } from "../../contexts/editInputModalContext";
import { CategoriesActions, Category } from "../../reducers/categoriesReducer";
import { EditInputModalActions } from "../../reducers/editInputModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesTab({ items }) {
  const { categoriesDispatch } = useCategories();
  const { editInputModalState, editInputModalDispatch } = useEditInputModal();

  useEffect(() => {
    if (editInputModalState.inputValue && editInputModalState.editCompleted) {
      updateCategory(editInputModalState.inputValue);
    }
  }, [editInputModalState.editCompleted]);

  function updateCategory(newName: string) {
    categoriesDispatch({
      type: CategoriesActions.UpdateCategory,
      payload: newName,
    });
    editInputModalDispatch({
      type: EditInputModalActions.SetEditCompleted,
      payload: false,
    });
  }

  function handleEdit(item: Category) {
    categoriesDispatch({
      type: CategoriesActions.UpdateCurrentEditingCategory,
      payload: item,
    });
    editInputModalDispatch({
      type: EditInputModalActions.UpdateInput,
      payload: item.name,
    });
    editInputModalDispatch({ type: EditInputModalActions.Open });
  }

  return (
    <ExpandableList
      items={items}
      onEdit={(item: Category) => handleEdit(item)}
    />
  );
}
