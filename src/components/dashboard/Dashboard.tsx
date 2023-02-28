import { useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import {
  classNames,
  formatCurrency,
  inSameMonth,
  previousMonth,
} from "../../utils";

function BalanceStats() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  let totalIncome = 0,
    tatalExpense = 0,
    lastMonthIncome = 0,
    lastMonthExpense = 0,
    thisMonthIncome = 0,
    thisMonthExpense = 0;

  const thisMonth = new Date();
  const lastMonth = previousMonth(thisMonth);

  for (let transaction of transactionsState.transactions) {
    const transactionDate = new Date(transaction.date);
    switch (transaction.type) {
      case CategoryType.Income:
        totalIncome += transaction.amount;
        if (inSameMonth(transactionDate, lastMonth)) {
          lastMonthIncome += transaction.amount;
        } else if (inSameMonth(transactionDate, thisMonth)) {
          thisMonthIncome += transaction.amount;
        }
        break;
      case CategoryType.Expense:
        tatalExpense += transaction.amount;
        if (inSameMonth(transactionDate, lastMonth)) {
          lastMonthExpense += transaction.amount;
        } else if (inSameMonth(transactionDate, thisMonth)) {
          thisMonthExpense += transaction.amount;
        }
        break;
    }
  }

  const stats = [
    {
      name: "Total",
      income: totalIncome,
      expense: tatalExpense,
    },
    {
      name: "Last Month",
      income: lastMonthIncome,
      expense: lastMonthExpense,
    },
    {
      name: "This Month",
      income: thisMonthIncome,
      expense: thisMonthExpense,
    },
  ];

  return (
    <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow lg:grid-cols-3 md:divide-y-0 md:divide-x">
      {stats.map((item) => {
        const balance = item.income - item.expense;
        return (
          <div key={item.name} className="px-4 py-5 sm:p-6">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1">
              <div className="flex justify-between items-baseline font-semibold ">
                <div className="text-gray-900">Income</div>
                <div className="text-green-600 text-xl">
                  {formatCurrency(item.income)}
                </div>
              </div>
              <div className="flex justify-between font-semibold">
                <div className="text-gray-900">Expense</div>
                <div className="text-red-600 text-xl">
                  {formatCurrency(item.expense)}
                </div>
              </div>
              <div className="flex justify-between font-semibold border-t-2 mt-4">
                <div className="text-gray-900">Balance</div>
                <div
                  className={classNames(
                    balance > 0 ? "text-green-600" : "text-red-600",
                    "text-xl"
                  )}
                >
                  {formatCurrency(balance)}
                </div>
              </div>
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        {/* Replace with your content */}
        <div className="py-4">
          <BalanceStats />
        </div>
        {/* /End replace */}
      </div>
    </div>
  );
}
