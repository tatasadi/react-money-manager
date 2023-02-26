import { useDispatch, useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import { classNames, formatCurrency, formatDate } from "../../utils";
import { openModalForUpdate } from "../../redux/transactionsSlice";

export default function TransactionsTab() {
  const dispatch = useDispatch();
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  const categoriesState = useSelector((state: RootState) => state.categories);

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
      {items && (
        <>
          <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex p-4 bg-white cursor-pointer hover:bg-gray-100"
                onClick={() => dispatch(openModalForUpdate(item))}
              >
                <div className="flex w-full items-end">
                  <div>
                    <div className="text-lg text-gray-900 flex items-center">
                      <div className="font-bold">{item.description}</div>
                      <div className="mx-2 text-sm text-gray-500">|</div>
                      <div className="text-sm text-gray-500">
                        {
                          categoriesState.categories?.find(
                            (c) => c.id === item.category
                          )?.name
                        }
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(item.date)}
                    </div>
                  </div>
                  <div
                    className={classNames(
                      item.type === CategoryType.Income
                        ? "text-green-600"
                        : "text-red-600",
                      "ml-auto text-lg font-bold"
                    )}
                  >
                    {(item.type === CategoryType.Income ? "+" : "-") +
                      formatCurrency(item.amount)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
