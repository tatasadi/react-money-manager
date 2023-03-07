import { useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import {
  classNames,
  formatCurrency,
  getLastSixMonthNames,
  getLastSixMonthYearAndMonth,
  inSameMonth,
  inSameYear,
} from "../../utils";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

import _ from "lodash";
import { Transaction } from "../../models/Transaction";
import moment from "moment";

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Last 6 Month",
    },
  },
};

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

function BalanceStats() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const transactions = [...transactionsState.transactions];
  transactions.sort((a, b) => {
    return moment(b.date).diff(moment(a.date));
  });

  let groupedByMonthTransactions = _.groupBy(
    transactions,
    (transaction: Transaction) =>
      moment(transaction.date).startOf("month").format("YYYY-MM")
  );

  _.forOwn(groupedByMonthTransactions, function (arr, key) {
    const totalIncomeOfTheMonth = arr
      .filter((t) => t.type === CategoryType.Income)
      .reduce((acc, cur) => (acc += cur.amount), 0);

    const totalExpenseOfTheMonth = arr
      .filter((t) => t.type === CategoryType.Expense)
      .reduce((acc, cur) => (acc += cur.amount), 0);

    groupedByMonthTransactions[key]["income"] = totalIncomeOfTheMonth;
    groupedByMonthTransactions[key]["expense"] = totalExpenseOfTheMonth;
    groupedByMonthTransactions[key]["balance"] =
      totalIncomeOfTheMonth - totalExpenseOfTheMonth;
  });

  const lastSixMonth = getLastSixMonthYearAndMonth();
  const incomeLineChartDataSet: number[] = [];
  const expenseLineChartDataSet: number[] = [];
  const balanceLineChartDataSet: number[] = [];
  lastSixMonth.forEach((m) => {
    if (groupedByMonthTransactions[m]) {
      incomeLineChartDataSet.push(groupedByMonthTransactions[m]["income"]);
      expenseLineChartDataSet.push(groupedByMonthTransactions[m]["expense"]);
      balanceLineChartDataSet.push(groupedByMonthTransactions[m]["balance"]);
    } else {
      incomeLineChartDataSet.push(0);
      expenseLineChartDataSet.push(0);
      balanceLineChartDataSet.push(0);
    }
  });

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

  const stats = [
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

  const lineChartData = {
    labels: getLastSixMonthYearAndMonth(),
    datasets: [
      {
        label: "Income",
        data: incomeLineChartDataSet,
        borderColor: "#86efac",
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: expenseLineChartDataSet,
        borderColor: "#fca5a5",
        backgroundColor: "#dc2626",
      },
      {
        label: "Balance",
        data: balanceLineChartDataSet,
        borderColor: "#a5b4fc",
        backgroundColor: "#4f46e5",
      },
    ],
  };

  return (
    <>
      <dl className="mt-2 grid grid-cols-1 divide-y divide-gray-200 lg:grid-cols-3 md:divide-y-0 md:divide-x gap-4">
        {stats.map((item) => {
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
      <div className="bg-white rounded-lg shadow mt-4 p-10">
        <Line options={lineChartOptions} data={lineChartData} />
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <BalanceStats />
        </div>
      </div>
    </div>
  );
}
