import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export default function MonthFilter() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const dates = transactionsState.transactions.map((t) => new Date(t.date));

  dates.sort(function (a, b) {
    return a - b;
  });

  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  console.log(dates, firstDate, lastDate);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-4">
      <div className="bg-white flex rounded-lg justify-between items-center">
        <button className="hover:bg-indigo-100 cursor-pointer p-4 rounded">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="font-bold text-xl">February 2023</div>
        <button className="hover:bg-indigo-100 cursor-pointer p-4 rounded">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
