import moment from "moment";
import { Line } from "react-chartjs-2";
import { CategoryType } from "../../models/CategoryType";
import { Transaction } from "../../models/Transaction";
import { getLastSixMonthYearAndMonth } from "../../utils";
import _ from "lodash";

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

export default function LastSixMonthLineChart({ transactions }) {
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
    <div className="bg-white rounded-lg shadow mt-4 p-10">
      <Line options={lineChartOptions} data={lineChartData} />
    </div>
  );
}
