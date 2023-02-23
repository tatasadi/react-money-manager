import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { updateSelectedTab } from "../../redux/transactionsSlice";
import Tabs from "../Tabs";

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
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
      </div>
      <Tabs tabs={tabs} updateTab={updateTab} />
    </div>
  );
}
