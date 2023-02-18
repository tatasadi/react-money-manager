import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "./contexts/categoriesContext";
import { EditInputModalProvider } from "./contexts/editInputModalContext";
import { WarningConfirmModalProvider } from "./contexts/warningConfirmModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <EditInputModalProvider>
        <WarningConfirmModalProvider>
          <CategoriesProvider>
            <App />
          </CategoriesProvider>
        </WarningConfirmModalProvider>
      </EditInputModalProvider>
    </Router>
  </React.StrictMode>
);
