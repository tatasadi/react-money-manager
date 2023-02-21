import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { EditInputModalProvider } from "./contexts/editInputModalContext";
import { WarningConfirmModalProvider } from "./contexts/warningConfirmModalContext";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <EditInputModalProvider>
          <WarningConfirmModalProvider>
            <App />
          </WarningConfirmModalProvider>
        </EditInputModalProvider>
      </Router>
    </ReduxProvider>
  </React.StrictMode>
);
