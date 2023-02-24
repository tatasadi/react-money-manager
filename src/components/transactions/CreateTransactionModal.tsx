import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CategoryType } from "../../models/CategoryType";

export default function CreateTransactionModal() {
  const categoriesState = useSelector((state: RootState) => state.categories);
  const categories = categoriesState.categories;
  const categoriesIncome = categories.filter(
    (c) => c.type === CategoryType.Income
  );
  const categoriesExpense = categories.filter(
    (c) => c.type === CategoryType.Expense
  );

  const [open, setOpen] = useState(true);

  const [formState, setFormState] = useState({
    type: "",
    categoryIncome: "",
    categoryExpense: "",
  });

  console.log(formState);

  function handleFormChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-full mx-2 sm:mx-8 sm:my-8 sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Add new transaction
                    </Dialog.Title>
                    <div className="mt-2 text-left">
                      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="type"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Type of transaction
                          </label>
                          <div className="mt-1">
                            <select
                              id="type"
                              name="type"
                              value={formState.type}
                              onChange={handleFormChange}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="">--- Select the type ---</option>
                              <option value="income">Income</option>
                              <option value="expense">Expense</option>
                            </select>
                          </div>
                        </div>
                        {formState.type === "income" && (
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="categoryIncome"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Category
                            </label>
                            <div className="mt-1">
                              <select
                                id="categoryIncome"
                                name="categoryIncome"
                                value={formState.categoryIncome}
                                onChange={handleFormChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option>--- Select a category ---</option>
                                {categoriesIncome.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        {formState.type === "expense" && (
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="categoryExpense"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Category
                            </label>
                            <div className="mt-1">
                              <select
                                id="categoryExpense"
                                name="categoryExpense"
                                value={formState.categoryExpense}
                                onChange={handleFormChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              >
                                <option value="">
                                  --- Select a category ---
                                </option>
                                {categoriesExpense.map((c) => (
                                  <option key={c.id} value={c.id}>
                                    {c.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <div className="sm:col-span-6">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <div className="mt-1">
                            <input
                              id="description"
                              name="description"
                              type="text"
                              autoComplete="description"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Amount
                          </label>
                          <div className="mt-1">
                            <input
                              id="amount"
                              name="amount"
                              type="number"
                              autoComplete="amount"
                              min={0}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date
                          </label>
                          <div className="mt-1">
                            <input
                              id="date"
                              name="date"
                              type="text"
                              autoComplete="date"
                              min={0}
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6 flex justify-center sm:justify-end">
                  <button
                    type="button"
                    className="inline-flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Save
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
