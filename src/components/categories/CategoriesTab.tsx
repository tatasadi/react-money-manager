import { useEffect } from "react";
import { useCategories } from "../../contexts/categoriesContext";
import { useEditInputModal } from "../../contexts/editInputModalContext";
import { CategoriesActions, Category } from "../../reducers/categoriesReducer";
import {
  EditInputModalActions,
  EditInputModalOperations,
} from "../../reducers/editInputModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesTab({ items }) {
  const { categoriesDispatch } = useCategories();
  const { editInputModalState, editInputModalDispatch } = useEditInputModal();

  useEffect(() => {
    if (editInputModalState.inputValue && editInputModalState.editCompleted) {
      if (
        editInputModalState.operation == EditInputModalOperations.AddCategory
      ) {
        categoriesDispatch({
          type: CategoriesActions.AddCategory,
          payload: editInputModalState.inputValue,
        });
      } else if (
        editInputModalState.operation == EditInputModalOperations.EditCategory
      ) {
        categoriesDispatch({
          type: CategoriesActions.UpdateCategory,
          payload: editInputModalState.inputValue,
        });
      }
      editInputModalDispatch({
        type: EditInputModalActions.SetEditCompleted,
        payload: false,
      });
    }
  }, [editInputModalState.editCompleted]);

  function handleEdit(item: Category) {
    categoriesDispatch({
      type: CategoriesActions.UpdateCurrentEditingCategory,
      payload: item,
    });

    editInputModalDispatch({
      type: EditInputModalActions.Open,
      payload: {
        title: "Edit Category",
        inputValue: item.name,
        operation: EditInputModalOperations.EditCategory,
      },
    });
  }

  function handleAdd() {
    editInputModalDispatch({
      type: EditInputModalActions.Open,
      payload: {
        title: "Add New Category",
        inputValue: "",
        operation: EditInputModalOperations.AddCategory,
      },
    });
  }

  return (
    <>
      <ExpandableList
        items={items}
        onEdit={(item: Category) => handleEdit(item)}
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
