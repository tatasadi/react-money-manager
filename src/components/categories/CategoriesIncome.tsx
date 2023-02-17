import { useEffect } from "react";
import { CategoriesActions, Category } from "../../reducers/categoriesReducer";
import { EditInputModalActions } from "../../reducers/editInputModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesIncome({
  state,
  dispatch,
  editInputModalState,
  editInputModalDispatch,
}) {
  useEffect(() => {
    if (editInputModalState.inputValue && editInputModalState.editCompleted) {
      updateCategory(editInputModalState.inputValue);
    }
  }, [editInputModalState.editCompleted]);

  function updateCategory(newName: string) {
    console.log("update category is called!", newName);
    dispatch({
      type: CategoriesActions.UpdateCategory,
      payload: newName,
    });
    editInputModalDispatch({
      type: EditInputModalActions.SetEditCompleted,
      payload: false,
    });
  }

  function handleEdit(item: Category) {
    dispatch({
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
    <div>
      <ExpandableList
        items={state.categoriesIncome}
        onEdit={(item: Category) => handleEdit(item)}
      />
    </div>
  );
}
