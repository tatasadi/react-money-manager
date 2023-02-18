import { createContext, useContext, useReducer } from "react";
import WarningConfirmModalReducer, {
  WarningConfirmModalOperations,
  WarningConfirmModalState,
} from "../reducers/warningConfirmModalReducer";

const WarningConfirmModalContext = createContext(null);

let initialWarningConfirmModalState: WarningConfirmModalState = {
  open: false,
  title: "",
  text: "",
  actionButtonText: "",
  confirmed: false,
};

export function WarningConfirmModalProvider({ children }) {
  const [warningConfirmModalState, warningConfirmModalDispatch] = useReducer(
    WarningConfirmModalReducer,
    initialWarningConfirmModalState
  );
  return (
    <WarningConfirmModalContext.Provider
      value={{ warningConfirmModalState, warningConfirmModalDispatch }}
    >
      {children}
    </WarningConfirmModalContext.Provider>
  );
}

export function useWarningConfirmModal() {
  const context = useContext(WarningConfirmModalContext);
  if (!context) {
    throw new Error(
      "useWarningConfirmModal must be used within a WarningConfirmModalProvider. Wrap a parent component in <WarningConfirmModalProvider> to fix this error."
    );
  }
  return context;
}
