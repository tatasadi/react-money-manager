import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { classNames } from "../../utils";
import { CategoriesContextProvider } from "../../context/CategoriesContext";
import EditInputModal from "../EditInputModal";
import { CategoriesContext } from "../../context/CategoriesContext";
import { useContext, useState } from "react";

const tabs = [
  { name: "Income", href: "income" },
  { name: "Expense", href: "expense" },
];

export default function Categories() {
  const {
    categoryToEdit,
    updateCategory,
    editCategoryModalOpen,
    updateEditCategoryModalOpen,
    updateSelectedTab,
  } = useContext(CategoriesContext);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  function handleSelectChange(e) {
    navigate(e.target.value.toLowerCase());
  }

  console.log(pathname);
  if (pathname === "/categories/expense") {
    updateSelectedTab("expense");
    console.log("update selected tab to expense");
  }

  return (
    <>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="rounded-lg border border-gray-200">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                  defaultValue={pathname === "income" ? "Income" : "Expense"}
                  onChange={handleSelectChange}
                >
                  {tabs.map((tab) => (
                    <option key={tab.name}>{tab.name}</option>
                  ))}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                  <nav className="-mb-px flex" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <Link
                        key={tab.name}
                        to={tab.href}
                        className={classNames(
                          pathname ===
                            `/categories/${tab.href.toLocaleLowerCase()}`
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                          "w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm"
                        )}
                        aria-current={
                          pathname ===
                          `/categories/${tab.href.toLocaleLowerCase()}`
                            ? "page"
                            : undefined
                        }
                        onClick={() =>
                          updateSelectedTab(tab.href.toLocaleLowerCase())
                        }
                      >
                        {tab.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      <EditInputModal
        open={editCategoryModalOpen}
        onClose={() => updateEditCategoryModalOpen(false)}
        inputValue={categoryToEdit?.name}
        onSave={(newValue) => updateCategory(newValue)}
      />
    </>
  );
}
