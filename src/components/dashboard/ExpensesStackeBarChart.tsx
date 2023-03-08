import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { CategoryType } from "../../models/CategoryType";
import { RootState } from "../../redux/store";
import { getLastSixMonthYearAndMonth } from "../../utils";
import _ from "lodash";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  plugins: {
    title: {
      display: true,
      text: "Expense Categories - Last 6 Month",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
const colors = [
  "#9333ea",
  "#0284c7",
  "#059669",
  "#ea580c",
  "#db2777",
  "#4f46e5",
  "#65a30d",
  "#dc2626",
  "#4b5563",
  "#ca8a04",
  "#d8b4fe",
  "#7dd3fc",
  "#6ee7b7",
  "#fdba74",
  "#f9a8d4",
  "#a5b4fc",
  "#bef264",
  "#fca5a5",
  "#d6d3d1",
  "#fcd34d",
];

export function ExpensesStackeBarChart({ groupedByMonthTransactions }) {
  const categoriesState = useSelector((state: RootState) => state.categories);
  const categoriesExpense = categoriesState.categories.filter(
    (c) => c.type === CategoryType.Expense
  );

  const expensesByMonth = {};

  _.forOwn(groupedByMonthTransactions, function (arr, key) {
    if (expensesByMonth[key] === undefined) {
      expensesByMonth[key] = {};
    }
    arr.forEach((item) => {
      if (item.type === CategoryType.Expense) {
        if (expensesByMonth[key][item.category] === undefined) {
          expensesByMonth[key][item.category] = item.amount;
        } else {
          expensesByMonth[key][item.category] += item.amount;
        }
      }
    });
  });

  const datasets = categoriesExpense.map((category, index) => {
    const categoryData = getLastSixMonthYearAndMonth().map((m) => {
      if (
        expensesByMonth[m] === undefined ||
        expensesByMonth[m][category.id] === undefined
      ) {
        return 0;
      }
      return expensesByMonth[m][category.id];
    });
    return {
      label: category.name,
      data: categoryData,
      backgroundColor: colors[index],
    };
  });

  const data = {
    labels: getLastSixMonthYearAndMonth(),
    datasets: datasets,
  };

  return (
    <div className="bg-white rounded-lg shadow mt-4 p-10">
      <Bar options={options} data={data} height="300px" />
    </div>
  );
}
