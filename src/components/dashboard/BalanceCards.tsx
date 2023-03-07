import {
  classNames,
  formatCurrency,
  inSameMonth,
  inSameYear,
} from "../../utils";
import { Pie } from "react-chartjs-2";
import { CategoryType } from "../../models/CategoryType";

const pieChartData = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "",
      data: null,
      backgroundColor: ["#86efac", "#fca5a5"],
      borderColor: ["#16a34a", "#dc2626"],
      borderWidth: 1,
    },
  ],
};

export default function BalanceCards({ transactions }) {
  let totalIncome = 0,
    tatalExpense = 0,
    thisYearIncome = 0,
    thisYearExpense = 0,
    thisMonthIncome = 0,
    thisMonthExpense = 0;

  const thisMonth = new Date();

  for (let transaction of transactions) {
    const transactionDate = new Date(transaction.date);
    switch (transaction.type) {
      case CategoryType.Income:
        totalIncome += transaction.amount;
        if (inSameYear(transactionDate, thisMonth)) {
          thisYearIncome += transaction.amount;
        }
        if (inSameMonth(transactionDate, thisMonth)) {
          thisMonthIncome += transaction.amount;
        }
        break;
      case CategoryType.Expense:
        tatalExpense += transaction.amount;
        if (inSameYear(transactionDate, thisMonth)) {
          thisYearExpense += transaction.amount;
        }
        if (inSameMonth(transactionDate, thisMonth)) {
          thisMonthExpense += transaction.amount;
        }
        break;
    }
  }

  const cards = [
    {
      name: "Total",
      income: totalIncome,
      expense: tatalExpense,
      balance: totalIncome - tatalExpense,
    },
    {
      name: "This Year",
      income: thisYearIncome,
      expense: thisYearExpense,
      balance: thisYearIncome - thisYearExpense,
    },
    {
      name: "This Month",
      income: thisMonthIncome,
      expense: thisMonthExpense,
      balance: thisMonthIncome - thisMonthExpense,
    },
  ];

  return (
    <>
      <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 md:divide-y-0 md:divide-x gap-4">
        {cards.map((item) => {
          return (
            <div
              key={item.name}
              className="px-4 py-5 sm:p-6 bg-white shadow rounded-lg"
            >
              <dt className="text-base font-normal text-gray-900">
                {item.name}
              </dt>
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
                <div className="flex justify-between font-semibold border-t-2 mt-2 pt-2">
                  <div className="text-gray-900">Balance</div>
                  <div
                    className={classNames(
                      item.balance > 0 ? "text-green-600" : "text-red-600",
                      "text-xl"
                    )}
                  >
                    {formatCurrency(item.balance)}
                  </div>
                </div>
                {item.balance !== 0 && (
                  <div className="flex justify-center items-center xl:p-10 lg:p-5 p-10 max-w-xs m-auto">
                    <Pie
                      data={{
                        ...pieChartData,
                        datasets: [
                          {
                            ...pieChartData.datasets[0],
                            data: [item.income, item.expense],
                          },
                        ],
                      }}
                    />
                  </div>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </>
  );
}
