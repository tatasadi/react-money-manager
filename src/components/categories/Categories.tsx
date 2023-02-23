import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateSelectedTab } from "../../redux/categoriesSlice";
import Tabs from "../Tabs";

const tabs = [
  { name: "Income", href: "income" },
  { name: "Expenses", href: "expenses" },
];

export default function Categories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/categories") {
      navigate("/categories/income");
      dispatch(updateSelectedTab("income"));
    }
  }, [pathname]);

  function updateTab(newTab: string) {
    dispatch(updateSelectedTab(newTab));
  }

  return (
    <div className="py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
      </div>
      <Tabs tabs={tabs} updateTab={updateTab} />
    </div>
  );
}
