import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CategoriesList from "./CategoriesList";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  updateCurrentDeletingCategory,
  updateCurrentEditingCategory,
} from "../../redux/categoriesSlice";
import { Category } from "../../models/Category";
import { ModalOperations } from "../../models/ModalOperations";
import { open as openModal } from "../../redux/modalSlice";
import { ModalTypes } from "../../models/ModalTypes";
import { CategoryType } from "../../models/CategoryType";

export default function CategoriesTab() {
  const categoriesState = useSelector((state: RootState) => state.categories);
  const modalState = useSelector((state: RootState) => state.modal);

  localStorage.setItem(
    "categories",
    JSON.stringify(categoriesState.categories)
  );

  const items = categoriesState.categories.filter(
    (c) =>
      c.type ===
      (categoriesState.selectedTab === "income"
        ? CategoryType.Income
        : CategoryType.Expense)
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (modalState.confirmed) {
      switch (modalState.operation) {
        case ModalOperations.AddCategory:
          if (modalState.inputValue)
            dispatch(addCategory(modalState.inputValue));
          break;
        case ModalOperations.UpdateCategory:
          if (modalState.inputValue)
            dispatch(updateCategory(modalState.inputValue));
          break;
        case ModalOperations.DeleteCategory:
          dispatch(deleteCategory());
          break;
      }
    }
  }, [modalState.confirmed]);

  function handleEdit(item: Category) {
    dispatch(updateCurrentEditingCategory(item));
    dispatch(
      openModal({
        title: "Edit Category",
        text: "Please give the category name.",
        actionButtonText: "Save",
        operation: ModalOperations.UpdateCategory,
        type: ModalTypes.Info,
        hasInput: true,
        inputValue: item.name,
      })
    );
  }

  function handleAdd() {
    dispatch(
      openModal({
        title: "Add New Category",
        text: "Please give the category name.",
        actionButtonText: "Add",
        operation: ModalOperations.AddCategory,
        type: ModalTypes.Info,
        hasInput: true,
        inputValue: "",
      })
    );
  }

  function handleDelete(item: Category) {
    dispatch(updateCurrentDeletingCategory(item));
    dispatch(
      openModal({
        title: "Delete Category",
        text: `Are you sure you want to delete the category "${item.name}"?`,
        actionButtonText: "Delete",
        operation: ModalOperations.DeleteCategory,
        type: ModalTypes.Warning,
        hasInput: false,
      })
    );
  }

  return (
    <>
      <CategoriesList
        items={items}
        onEdit={(item: Category) => handleEdit(item)}
        onDelete={(item: Category) => handleDelete(item)}
      />
      <div className="my-4 flex items-center justify-center">
        <button
          className=" rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          onClick={handleAdd}
        >
          Add New
        </button>
      </div>
    </>
  );
}
