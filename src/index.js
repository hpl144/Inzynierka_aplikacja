import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ParametersProvider } from "./context/ParametersContext";
import { RowsProvider } from "./context/RowsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ParametersProvider>
      <RowsProvider>
        <App />
      </RowsProvider>
    </ParametersProvider>
  </React.StrictMode>
);
