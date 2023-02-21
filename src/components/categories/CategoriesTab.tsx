import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEditInputModal } from "../../contexts/editInputModalContext";
import {
  EditInputModalActions,
  EditInputModalOperations,
} from "../../reducers/editInputModalReducer";
import { WarningConfirmModalActions } from "../../reducers/warningConfirmModalReducer";
import { RootState } from "../../redux/store";
import ExpandableList from "../ExpandableList";
import {
  addCategory,
  deleteCategory,
  updateCategory,
  updateCurrentDeletingCategory,
  updateCurrentEditingCategory,
} from "../../redux/categoriesSlice";
import { Category } from "../../models/Category";
import { ModalWithConfirmOperations } from "../../models/ModalWithConfirmOperations";
import { open as openModalWithConfirm } from "../../redux/modalWithConfirmSlice";
import { ModalWithConfirmTypes } from "../../models/ModalWithConfirmTypes";

export default function CategoriesTab() {
  const categoriesState = useSelector((state: RootState) => state.categories);
  const modalWithConfirmState = useSelector(
    (state: RootState) => state.modalWithConfirm
  );

  let items;
  if (categoriesState.selectedTab === "income") {
    items = categoriesState.categoriesIncome;
    localStorage.setItem("categories_income", JSON.stringify(items));
  } else if (categoriesState.selectedTab === "expense") {
    items = categoriesState.categoriesExpense;
    localStorage.setItem("categories_expense", JSON.stringify(items));
  }

  const dispatch = useDispatch();
  const { editInputModalState, editInputModalDispatch } = useEditInputModal();

  useEffect(() => {
    if (editInputModalState.inputValue && editInputModalState.editCompleted) {
      if (
        editInputModalState.operation === EditInputModalOperations.AddCategory
      ) {
        dispatch(addCategory(editInputModalState.inputValue));
      } else if (
        editInputModalState.operation === EditInputModalOperations.EditCategory
      ) {
        dispatch(updateCategory(editInputModalState.inputValue));
      }
      editInputModalDispatch({
        type: EditInputModalActions.SetEditCompleted,
        payload: false,
      });
    }
  }, [editInputModalState.editCompleted]);

  useEffect(() => {
    if (
      modalWithConfirmState.confirmed &&
      modalWithConfirmState.operation ===
        ModalWithConfirmOperations.DeleteCategory
    ) {
      dispatch(deleteCategory());
    }
  }, [modalWithConfirmState.confirmed]);

  function handleEdit(item: Category) {
    dispatch(updateCurrentEditingCategory(item));

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
    dispatch(updateCurrentDeletingCategory(item));
    dispatch(
      openModalWithConfirm({
        title: "Delete Category",
        text: `Are you sure you want to delete the category "${item.name}"`,
        actionButtonText: "Delete",
        operation: ModalWithConfirmOperations.DeleteCategory,
        type: ModalWithConfirmTypes.Warning,
      })
    );
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
