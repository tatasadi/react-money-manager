import { Category } from "../../reducers/categoriesReducer";
import { EditInputModalActions } from "../../reducers/editInputModalReducer";
import ExpandableList from "../ExpandableList";

export default function CategoriesExpense({
  state,
  dispatch,
  editInputModalDispatch,
}) {
  function handleEdit(item: Category) {
    editInputModalDispatch({
      type: EditInputModalActions.UpdateInput,
      payload: item.name,
    });
    editInputModalDispatch({ type: EditInputModalActions.Open });
  }

  return (
    <div>
      <ExpandableList
        items={state.categoriesExpense}
        onEdit={(item: Category) => handleEdit(item)}
      />
    </div>
  );
}
