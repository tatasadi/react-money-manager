import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateSelectedTab } from "../../redux/transactionsSlice";
import Tabs from "../Tabs";
import { PlusIcon } from "@heroicons/react/24/outline";
import TransactionModal from "./TransactionModal";
import { openModalForCreate } from "../../redux/transactionsSlice";
import MonthFilter from "../MonthFilter";

const tabs = [
  { name: "All", href: "all" },
  { name: "Income", href: "income" },
  { name: "Expenses", href: "expenses" },
];

export default function Transactions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/transactions") {
      navigate("/transactions/all");
      dispatch(updateSelectedTab("all"));
    }
  }, [pathname]);

  function updateTab(newTab: string) {
    dispatch(updateSelectedTab(newTab));
  }

  return (
    <div className="py-6 h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      <MonthFilter />
      <Tabs tabs={tabs} updateTab={updateTab} />
      <button
        type="button"
        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 fixed bottom-10 right-10"
        onClick={() => dispatch(openModalForCreate())}
      >
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <TransactionModal />
    </div>
  );
}
