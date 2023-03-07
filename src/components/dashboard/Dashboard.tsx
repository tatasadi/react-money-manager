import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import moment from "moment";
import LastSixMonthLineChart from "./LastSixMonthLineChart";
import BalanceCards from "./BalanceCards";
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

export default function Dashboard() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const transactions = [...transactionsState.transactions];
  transactions.sort((a, b) => {
    return moment(b.date).diff(moment(a.date));
  });

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <BalanceCards transactions={transactions} />
          <LastSixMonthLineChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
