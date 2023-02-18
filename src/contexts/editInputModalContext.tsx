import { createContext, useContext, useReducer } from "react";
import editInputModalReducer, {
  EditInputModalState,
} from "../reducers/editInputModalReducer";

const EditInputModalContext = createContext(null);

let initialEditInputModalState: EditInputModalState = {
  open: false,
  inputValue: "",
  editCompleted: false,
};

export function EditInputModalProvider({ children }) {
  const [editInputModalState, editInputModalDispatch] = useReducer(
    editInputModalReducer,
    initialEditInputModalState
  );
  return (
    <EditInputModalContext.Provider
      value={{ editInputModalState, editInputModalDispatch }}
    >
      {children}
    </EditInputModalContext.Provider>
  );
}

export function useEditInputModal() {
  const context = useContext(EditInputModalContext);
  if (!context) {
    throw new Error(
      "useEditInputModal must be used within a EditInputModalProvider. Wrap a parent component in <EditInputModalProvider> to fix this error."
    );
  }
  return context;
}
