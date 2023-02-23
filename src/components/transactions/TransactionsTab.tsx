import { useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import TransactionsList from "./TransactionsList";

export default function TransactionsTab() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  localStorage.setItem(
    "transactions",
    JSON.stringify(transactionsState.transactions)
  );

  let items;

  switch (transactionsState.selectedTab) {
    case "all":
      items = transactionsState.transactions;
      break;
    case "income":
      items = transactionsState.transactions.filter(
        (t) => t.type === CategoryType.Income
      );
      break;
    case "expenses":
      items = transactionsState.transactions.filter(
        (t) => t.type === CategoryType.Expense
      );
      break;
  }

  return (
    <>
      <TransactionsList items={items} />
    </>
  );
}
