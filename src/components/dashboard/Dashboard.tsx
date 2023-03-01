import { useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import {
  classNames,
  formatCurrency,
  inSameMonth,
  previousMonth,
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

const pieChartDate = {
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
      balance: totalIncome - tatalExpense,
    },
    {
      name: "Last Month",
      income: lastMonthIncome,
      expense: lastMonthExpense,
      balance: lastMonthIncome - lastMonthExpense,
    },
    {
      name: "This Month",
      income: thisMonthIncome,
      expense: thisMonthExpense,
      balance: thisMonthIncome - thisMonthExpense,
    },
  ];

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Income",
        data: [lastMonthIncome, thisMonthIncome, 1000, 2000, 2500, 1500, 1700],
        borderColor: "#86efac",
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: [lastMonthExpense, thisMonthExpense, 600, 1300, 1700, 2000, 1700],
        borderColor: "#fca5a5",
        backgroundColor: "#dc2626",
      },
      {
        label: "Balance",
        data: [
          lastMonthIncome - lastMonthExpense,
          thisMonthIncome - thisMonthExpense,
          400,
          700,
          800,
          -500,
          0,
        ],
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
                <div className="flex justify-between font-semibold border-t-2 mt-4">
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
                  <div className="flex justify-center items-center xl:p-10 lg:p-5 p-10">
                    <Pie
                      data={{
                        ...pieChartDate,
                        datasets: [
                          {
                            ...pieChartDate.datasets[0],
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
        {/* Replace with your content */}
        <div className="py-4">
          <BalanceStats />
        </div>
        {/* /End replace */}
      </div>
    </div>
  );
}
