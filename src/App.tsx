import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  ListBulletIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { classNames, randomDate } from "./utils";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./components/dashboard/Dashboard";
import Categories from "./components/categories/Categories";
import Transactions from "./components/transactions/Transactions";
import CategoriesTab from "./components/categories/CategoriesTab";
import Modal from "./components/modals/Modal";
import TransactionsTab from "./components/transactions/TransactionsTab";

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  {
    name: "Categories",
    href: "/categories",
    icon: RectangleGroupIcon,
  },
  {
    name: "Transactions",
    href: "/transactions",
    icon: ListBulletIcon,
  },
];

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { pathname } = useLocation();

  function isNavLinkActive(item) {
    switch (item.name) {
      case "Categories":
      case "Transactions":
        return pathname.includes(item.href);
      default:
        return pathname === item.href;
    }
  }

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
                      className="h-16 w-auto"
                      src="/img/money-manager-logo-dark.png"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          isNavLinkActive(item)
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className={classNames(
                            isNavLinkActive(item)
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
                className="h-16 w-auto"
                src="/img/money-manager-logo-dark.png"
                alt="Your Company"
              />
            </div>
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    isNavLinkActive(item)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      isNavLinkActive(item)
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
            <div className="text-white text-center p-4 text-sm">
              <p>
                This site is created for demonstrative purposes only and does
                not offer any real products or services.
              </p>
              <p className="mt-1">
                ©{" "}
                <a
                  className="hover:text-indigo-300"
                  href="https://ehsan.tatasadi.com"
                  target="_blank"
                >
                  ehsan.tatasadi.com
                </a>
              </p>
            </div>
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
            <Route path="/categories" element={<Categories />}>
              <Route path="income" element={<CategoriesTab />} />
              <Route path="expenses" element={<CategoriesTab />} />
            </Route>
            <Route path="/transactions" element={<Transactions />}>
              <Route path="all" element={<TransactionsTab />} />
              <Route path="income" element={<TransactionsTab />} />
              <Route path="expenses" element={<TransactionsTab />} />
            </Route>
          </Routes>
        </main>
      </div>
      <Modal />
    </>
  );
}
