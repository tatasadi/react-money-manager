import { Fragment, useReducer, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  UsersIcon,
  XMarkIcon,
  ListBulletIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { classNames } from "./utils";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Categories from "./components/categories/Categories";
import Transactions from "./components/Transactions";
import CategoriesExpense from "./components/categories/CategoriesExpense";
import CategoriesIncome from "./components/categories/CategoriesIncome";
import categoriesReducer, {
  CategoriesState,
} from "./reducers/categoriesReducer";
import EditInputModal from "./components/EditInputModal";
import editInputModalReducer, {
  EditInputModalState,
} from "./reducers/editInputModalReducer";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Categories",
    href: "/categories/income",
    icon: RectangleGroupIcon,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ListBulletIcon,
  },
  // { name: "Team", href: "#", icon: UsersIcon, current: false },
  // { name: "Projects", href: "#", icon: FolderIcon, current: false },
  // { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  // { name: "Documents", href: "#", icon: InboxIcon, current: false },
  // { name: "Reports", href: "#", icon: ChartBarIcon, current: false },
];

let initialCategoriesState: CategoriesState = {
  selectedTab: "income",
  categoriesIncome: [
    { id: "48299da5-b1eb-4fd1-82d1-d58e9f3c71ed", name: "Salary" },
    { id: "434cd88f-288f-4aa0-a0f1-af6bee4d019e", name: "Financial Income" },
    { id: "09fe9af8-f9b0-4bf4-8fcf-673e1d4efc55", name: "Other (Income)" },
  ],
  categoriesExpense: [
    { id: "1e671ae1-429c-4e7f-b4a9-7fad95202bd0", name: "Home" },
    { id: "ff8c7256-b3ea-42ea-b092-7218c3a1cddb", name: "Supermarket" },
    { id: "30c38c18-ce5d-49f1-b5e2-15752613214b", name: "Eating Out" },
    { id: "b183cd0c-b5e6-46dc-844b-f49171d0d708", name: "Clothing" },
    { id: "e32c3003-dadf-4450-910a-151fb7e4bd6c", name: "Health" },
    { id: "db365832-0b17-4ce2-8797-3bc0ce8cf0b6", name: "Travel" },
    { id: "a992d9d0-2fb9-42dc-b012-4ba2e3df31a3", name: "Transportation" },
    { id: "adef755b-7a3b-41ef-806e-dee157245c6b", name: "Gift" },
    { id: "213de0f9-2d79-453d-82cc-95a1f192e58c", name: "Other (Expense)" },
  ],
};

try {
  const categoriesIncomeInLocalStorage = JSON.parse(
    localStorage.getItem("categories_income")
  );
  if (categoriesIncomeInLocalStorage) {
    initialCategoriesState.categoriesIncome = categoriesIncomeInLocalStorage;
  }
  const categoriesExpenseInLocalStorage = JSON.parse(
    localStorage.getItem("categories_expense")
  );
  if (categoriesExpenseInLocalStorage) {
    initialCategoriesState.categoriesExpense = categoriesExpenseInLocalStorage;
  }
} catch {
  console.error("The categories could not be parsed into JSON.");
}

let initialEditInputModalState: EditInputModalState = {
  open: false,
  inputValue: "",
  editCompleted: false,
};

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [categoriesState, categoriesDispatch] = useReducer(
    categoriesReducer,
    initialCategoriesState
  );

  const [editInputModalState, editInputModalDispatch] = useReducer(
    editInputModalReducer,
    initialEditInputModalState
  );

  const { pathname } = useLocation();

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-300"
                              : "text-gray-400 group-hover:text-gray-300",
                            "mr-4 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
            <div className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex min-h-0 flex-1 flex-col bg-gray-800">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex flex-shrink-0 items-center px-4">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      pathname === item.href
                        ? "text-gray-300"
                        : "text-gray-400 group-hover:text-gray-300",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route
              path="/categories"
              element={
                <Categories
                  state={categoriesState}
                  dispatch={categoriesDispatch}
                />
              }
            >
              <Route
                path="income"
                element={
                  <CategoriesIncome
                    state={categoriesState}
                    dispatch={categoriesDispatch}
                    editInputModalState={editInputModalState}
                    editInputModalDispatch={editInputModalDispatch}
                  />
                }
              />
              <Route
                path="expense"
                element={
                  <CategoriesExpense
                    state={categoriesState}
                    dispatch={categoriesDispatch}
                    editInputModalDispatch={editInputModalDispatch}
                  />
                }
              />
            </Route>
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </main>
      </div>
      <EditInputModal
        editInputModalState={editInputModalState}
        editInputModalDispatch={editInputModalDispatch}
      />
    </>
  );
}
