import { useContext } from "react";
import { Context } from "../../Context";
import ExpandableList from "../ExpandableList";

export default function CategoriesIncome() {
  const { categoriesIncome } = useContext(Context);

  return (
    <div>
      <ExpandableList items={categoriesIncome} />
    </div>
  );
}
