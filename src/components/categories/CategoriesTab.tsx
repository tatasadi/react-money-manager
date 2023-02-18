import { useEffect } from "react";
import { useCategories } from "../../contexts/categoriesContext";
import { useEditInputModal } from "../../contexts/editInputModalContext";
import { useWarningConfirmModal } from "../../contexts/warningConfirmModalContext";
import { CategoriesActions, Category } from "../../reducers/categoriesReducer";
import {
  EditInputModalActions,
  EditInputModalOperations,
} from "../../reducers/editInputModalReducer";
import {
  WarningConfirmModalActions,
  WarningConfirmModalOperations,
} from "../../reducers/warningConfirmModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesTab({ items }) {
  const { categoriesState, categoriesDispatch } = useCategories();
  const { editInputModalState, editInputModalDispatch } = useEditInputModal();
  const { warningConfirmModalState, warningConfirmModalDispatch } =
    useWarningConfirmModal();

  useEffect(() => {
    if (editInputModalState.inputValue && editInputModalState.editCompleted) {
      if (
        editInputModalState.operation === EditInputModalOperations.AddCategory
      ) {
        categoriesDispatch({
          type: CategoriesActions.AddCategory,
          payload: editInputModalState.inputValue,
        });
      } else if (
        editInputModalState.operation === EditInputModalOperations.EditCategory
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

  useEffect(() => {
    if (
      warningConfirmModalState.confirmed &&
      warningConfirmModalState.operation ===
        WarningConfirmModalOperations.DeleteCategory
    ) {
      categoriesDispatch({
        type: CategoriesActions.DeleteCategory,
      });

      editInputModalDispatch({
        type: WarningConfirmModalActions.SetConfirmed,
        payload: false,
      });
    }
  }, [warningConfirmModalState.confirmed]);

  //debug
  useEffect(() => {
    console.log("categoriesState", categoriesState);
  }, [categoriesState]);

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

  function handleDelete(item: Category) {
    categoriesDispatch({
      type: CategoriesActions.UpdateCurrentDeletingCategory,
      payload: item,
    });

    warningConfirmModalDispatch({
      type: WarningConfirmModalActions.Open,
      payload: {
        title: "Delete Category",
        text: `Are you sure you want to delete the category "${item.name}"`,
        actionButtonText: "Delete",
        operation: WarningConfirmModalOperations.DeleteCategory,
      },
    });
  }

  return (
    <>
      <ExpandableList
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
