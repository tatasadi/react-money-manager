import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CategoryType } from "../../models/CategoryType";
import { FormStatusType } from "../../models/FormStatusType";
import { classNames } from "../../utils";
import { createTransaction, openModal } from "../../redux/transactionsSlice";

export default function CreateTransactionModal() {
  const transactionsState = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    type: "",
    categoryIncome: "",
    categoryExpense: "",
    description: "",
    amount: "",
    date: "",
  });
  const [status, setStatus] = useState(FormStatusType.Idle);
  const [touched, setTouched] = useState({});

  const errors = getErrors(formState);
  const isValid = Object.keys(errors).length === 0;

  const hasTypeError =
    (touched.type || status === FormStatusType.Submitted) && errors.type;
  const hasCategoryIncomeError =
    (touched.categoryIncome || status === FormStatusType.Submitted) &&
    errors.category &&
    formState.type === "income";
  const hasCategoryExpenseError =
    (touched.categoryExpense || status === FormStatusType.Submitted) &&
    errors.category &&
    formState.type === "expense";
  const hasDescriptionError =
    (touched.description || status === FormStatusType.Submitted) &&
    errors.description;
  const hasAmountError =
    (touched.amount || status === FormStatusType.Submitted) && errors.amount;
  const hasDateError =
    (touched.date || status === FormStatusType.Submitted) && errors.date;

  console.log(formState, isValid, errors);

  const categoriesState = useSelector((state: RootState) => state.categories);
  const categories = categoriesState.categories;
  const categoriesIncome = categories.filter(
    (c) => c.type === CategoryType.Income
  );
  const categoriesExpense = categories.filter(
    (c) => c.type === CategoryType.Expense
  );

  function getErrors() {
    const result = {};
    if (!formState.type) result.type = "Please select a type!";
    if (!formState.categoryIncome && !formState.categoryExpense)
      result.category = "Please select a category!";
    if (!formState.description)
      result.description = "Please give a description!";
    if (!formState.amount) result.amount = "Please give an amount!";
    if (!formState.date) result.date = "Please select a date!";
    return result;
  }

  function handleFormChange(e) {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    });
  }

  function handleBlur(e) {
    setTouched((currunt) => ({ ...currunt, [e.target.id]: true }));
  }

  function handleSubmit(e) {
    console.log("handle submit");
    e.preventDefault();
    setStatus(FormStatusType.Submitting);
    if (isValid) {
      dispatch(
        createTransaction({
          id: "",
          type:
            formState.type === "income"
              ? CategoryType.Income
              : CategoryType.Expense,
          category:
            formState.type === "income"
              ? formState.categoryIncome
              : formState.categoryExpense,
          description: formState.description,
          amount: Number(formState.amount),
          date: formState.date,
        })
      );
      setStatus(FormStatusType.Completed);
      dispatch(openModal(false));
    } else {
      setStatus(FormStatusType.Submitted);
    }
  }

  return (
    <Transition.Root show={transactionsState.modalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={(e) => dispatch(openModal(e))}
      >
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
                <form onSubmit={handleSubmit}>
                  <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => dispatch(openModal(false))}
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
                                onBlur={handleBlur}
                                className={classNames(
                                  hasTypeError
                                    ? "border-red-600"
                                    : "border-gray-300",
                                  "block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                )}
                              >
                                <option value="">
                                  --- Select the type ---
                                </option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                              </select>
                              {hasTypeError && (
                                <p className="text-red-600 text-sm">
                                  {errors.type}
                                </p>
                              )}
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
                                  onBlur={handleBlur}
                                  className={classNames(
                                    hasCategoryIncomeError
                                      ? "border-red-600"
                                      : "border-gray-300",
                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  )}
                                >
                                  <option value="">
                                    --- Select a category ---
                                  </option>
                                  {categoriesIncome.map((c) => (
                                    <option key={c.id} value={c.id}>
                                      {c.name}
                                    </option>
                                  ))}
                                </select>
                                {hasCategoryIncomeError && (
                                  <p className="text-red-600 text-sm">
                                    {errors.category}
                                  </p>
                                )}
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
                                  onBlur={handleBlur}
                                  className={classNames(
                                    hasCategoryExpenseError
                                      ? "border-red-600"
                                      : "border-gray-300",
                                    "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                  )}
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
                                {hasCategoryExpenseError && (
                                  <p className="text-red-600 text-sm">
                                    {errors.category}
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="sm:col-span-6">
                            <label
                              htmlFor="description"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Description
                            </label>
                            <div className="mt-1">
                              <input
                                id="description"
                                name="description"
                                type="text"
                                value={formState.description}
                                onChange={handleFormChange}
                                onBlur={handleBlur}
                                autoComplete="description"
                                className={classNames(
                                  hasDescriptionError
                                    ? "border-red-600"
                                    : "border-gray-300",
                                  "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                )}
                              />
                              {hasDescriptionError && (
                                <p className="text-red-600 text-sm">
                                  {errors.description}
                                </p>
                              )}
                            </div>
                          </div>
                          {/* FIXME: Amount accept just whole numbers! */}
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
                                value={formState.amount}
                                onChange={handleFormChange}
                                onBlur={handleBlur}
                                className={classNames(
                                  hasAmountError
                                    ? "border-red-600"
                                    : "border-gray-300",
                                  "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                )}
                              />
                              {hasAmountError && (
                                <p className="text-red-600 text-sm">
                                  {errors.amount}
                                </p>
                              )}
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
                                value={formState.date}
                                onChange={handleFormChange}
                                onBlur={handleBlur}
                                className={classNames(
                                  hasDateError
                                    ? "border-red-600"
                                    : "border-gray-300",
                                  "block w-full rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                )}
                              />
                              {hasDateError && (
                                <p className="text-red-600 text-sm">
                                  {errors.date}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex justify-center sm:justify-end">
                    <button
                      type="submit"
                      className="inline-flex w-fit justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
