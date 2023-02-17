import { CategoriesActions, Category } from "../../reducers/categoriesReducer";
import { EditInputModalActions } from "../../reducers/editInputModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesIncome({
  state,
  dispatch,
  editInputModalDispatch,
}) {
  function updateCategory(newName: string) {
    console.log("update category is called!", newName);
    dispatch({
      type: CategoriesActions.UpdateCategory,
      payload: { id: state.currentEditingId, newName },
    });
  }

  function handleEdit(item: Category) {
    dispatch({
      type: CategoriesActions.UpdateCurrentEditingId,
      payload: item.id,
    });
    editInputModalDispatch({
      type: EditInputModalActions.setOnSaveCallback,
      payload: updateCategory,
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
