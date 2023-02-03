import { useContext } from "react";
import { Context } from "../../Context";
import ExpandableList from "../ExpandableList";

export default function CategoriesExpense() {
  const { categoriesExpense } = useContext(Context);

  return (
    <div>
      <ExpandableList items={categoriesExpense} />
    </div>
  );
}
