import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateSelectedTab } from "../../redux/transactionsSlice";
import Tabs from "../Tabs";
import { PlusIcon } from "@heroicons/react/24/outline";
import CreateTransactionModal from "./CreateTransactionModal";

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

  function openCreateTransactionModal() {}

  return (
    <div className="py-6 relative h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      <Tabs tabs={tabs} updateTab={updateTab} />
      <button
        type="button"
        className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 absolute bottom-10 right-10 z-10"
        onClick={openCreateTransactionModal}
      >
        <PlusIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      <CreateTransactionModal />
    </div>
  );
}
