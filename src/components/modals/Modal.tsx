import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { close, setConfirmed, updateInput } from "../../redux/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ModalTypes } from "../../models/ModalTypes";
import { classNames } from "../../utils";

interface ModalIconProps {
  type?: ModalTypes;
}

const ModalIcon = ({ type }: ModalIconProps) => {
  switch (type) {
    case ModalTypes.Warning:
      return (
        <ExclamationTriangleIcon
          className="h-6 w-6 text-red-600"
          aria-hidden="true"
        />
      );
    case ModalTypes.Info:
      return (
        <InformationCircleIcon
          className="h-6 w-6 text-indigo-600"
          aria-hidden="true"
        />
      );
    default:
      return null;
  }
};

export default function Modal() {
  const [value, setValue] = useState("");

  const modalState = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (modalState.hasInput) {
      setValue(modalState.inputValue ?? "");
    }
  }, [modalState.open]);

  function handleClose() {
    dispatch(close());
  }

  function handleConfirm() {
    dispatch(setConfirmed(true));
    if (modalState.hasInput) {
      dispatch(updateInput(value));
    }
    handleClose();
  }

  return (
    <Transition.Root show={modalState.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all w-4/5 sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="sm:flex sm:items-start">
                  <div
                    className={classNames(
                      modalState.type === ModalTypes.Warning
                        ? "bg-red-100"
                        : "bg-indigo-100",
                      "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                    )}
                  >
                    <ModalIcon type={modalState.type} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {modalState.title}
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">{modalState.text}</p>
                      {modalState.hasInput && (
                        <>
                          <div className="w-full">
                            <input
                              type="text"
                              value={value}
                              onChange={(e) => setValue(e.target.value)}
                              className="block w-full p-2 mt-2 rounded-md border border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-sm"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className={classNames(
                      modalState.type === ModalTypes.Warning
                        ? "bg-red-600 hover:bg-red-700 focus:ring-red-500"
                        : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500",
                      "inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    )}
                    onClick={handleConfirm}
                  >
                    {modalState.actionButtonText}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={handleClose}
                  >
                    Cancel
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
