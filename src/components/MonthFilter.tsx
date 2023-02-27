import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getMonthString, nextMonth, previousMonth } from "../utils";

export default function MonthFilter() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonthString = getMonthString(currentDate);

  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const dates = transactionsState.transactions.map((t) => new Date(t.date));

  dates.sort(function (a, b) {
    return a - b;
  });

  const firstDate = dates[0];
  const lastDate = dates[dates.length - 1];

  const previousDisabled =
    currentDate.getFullYear() === firstDate.getFullYear() &&
    currentDate.getMonth() === firstDate.getMonth();

  const nextDisabled =
    currentDate.getFullYear() === lastDate.getFullYear() &&
    currentDate.getMonth() === lastDate.getMonth();

  function handlePreviousMonth() {
    if (previousDisabled) return;
    setCurrentDate((prevDate) => previousMonth(prevDate));
  }

  function handleNextMonth() {
    if (nextDisabled) return;
    setCurrentDate((prevDate) => nextMonth(prevDate));
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 mt-4">
      <div className="bg-white flex rounded-lg justify-between items-center">
        <button
          disabled={previousDisabled}
          className="hover:bg-indigo-100 cursor-pointer p-4 rounded disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-300"
          onClick={handlePreviousMonth}
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="font-bold text-xl">{currentMonthString}</div>
        <button
          disabled={nextDisabled}
          className="hover:bg-indigo-100 cursor-pointer p-4 rounded disabled:cursor-not-allowed disabled:hover:bg-white disabled:text-gray-300"
          onClick={handleNextMonth}
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
