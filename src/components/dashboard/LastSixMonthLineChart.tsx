import moment from "moment";
import { Line } from "react-chartjs-2";
import { CategoryType } from "../../models/CategoryType";
import { Transaction } from "../../models/Transaction";
import { getLastSixMonthYearAndMonth } from "../../utils";
import _ from "lodash";

const options = {
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

export default function LastSixMonthLineChart({ groupedByMonthTransactions }) {
  const chartDataSet = {};

  _.forOwn(groupedByMonthTransactions, function (arr, key) {
    const totalIncomeOfTheMonth = arr
      .filter((t) => t.type === CategoryType.Income)
      .reduce((acc, cur) => (acc += cur.amount), 0);

    const totalExpenseOfTheMonth = arr
      .filter((t) => t.type === CategoryType.Expense)
      .reduce((acc, cur) => (acc += cur.amount), 0);

    if (chartDataSet[key] === undefined) {
      chartDataSet[key] = {};
    }
    chartDataSet[key]["income"] = totalIncomeOfTheMonth;
    chartDataSet[key]["expense"] = totalExpenseOfTheMonth;
    chartDataSet[key]["balance"] =
      totalIncomeOfTheMonth - totalExpenseOfTheMonth;
  });

  const lastSixMonth = getLastSixMonthYearAndMonth();
  const incomeDataSet: number[] = [];
  const expenseDataSet: number[] = [];
  const balanceDataSet: number[] = [];
  lastSixMonth.forEach((m) => {
    if (chartDataSet[m]) {
      incomeDataSet.push(chartDataSet[m]["income"]);
      expenseDataSet.push(chartDataSet[m]["expense"]);
      balanceDataSet.push(chartDataSet[m]["balance"]);
    } else {
      incomeDataSet.push(0);
      expenseDataSet.push(0);
      balanceDataSet.push(0);
    }
  });

  const data = {
    labels: getLastSixMonthYearAndMonth(),
    datasets: [
      {
        label: "Income",
        data: incomeDataSet,
        borderColor: "#86efac",
        backgroundColor: "#16a34a",
      },
      {
        label: "Expense",
        data: expenseDataSet,
        borderColor: "#fca5a5",
        backgroundColor: "#dc2626",
      },
      {
        label: "Balance",
        data: balanceDataSet,
        borderColor: "#a5b4fc",
        backgroundColor: "#4f46e5",
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow mt-4 p-10">
      <Line options={options} data={data} height="300px" />
    </div>
  );
}
