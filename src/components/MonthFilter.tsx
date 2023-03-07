import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setFilterDate } from "../redux/transactionsSlice";
import {
  dateToString,
  getMonthString,
  inSameMonth,
  nextMonth,
  previousMonth,
} from "../utils";

export default function MonthFilter() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );

  const [currentDate, setCurrentDate] = useState(
    new Date(transactionsState.filterDate)
  );
  const currentMonthString = getMonthString(currentDate);
  const dispatch = useDispatch();

  const dates = transactionsState.transactions.map((t) => new Date(t.date));

  dates.sort(function (a, b) {
    return a - b;
  });

  const firstDate = dates[0];

  const previousDisabled = inSameMonth(currentDate, firstDate);
  const nextDisabled = inSameMonth(currentDate, new Date());

  function handlePreviousMonth() {
    if (previousDisabled) return;
    const pm = previousMonth(currentDate);
    setCurrentDate(pm);
    dispatch(setFilterDate(dateToString(pm)));
  }

  function handleNextMonth() {
    if (nextDisabled) return;
    const nm = nextMonth(currentDate);
    setCurrentDate(nm);
    dispatch(setFilterDate(dateToString(nm)));
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
