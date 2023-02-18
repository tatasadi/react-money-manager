import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { CategoriesProvider } from "./contexts/categoriesContext";
import { EditInputModalProvider } from "./contexts/editInputModalContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <EditInputModalProvider>
        <CategoriesProvider>
          <App />
        </CategoriesProvider>
      </EditInputModalProvider>
    </Router>
  </React.StrictMode>
);
