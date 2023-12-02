import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ApprovalStatusProvider } from "./components/ApprovalStatusProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApprovalStatusProvider>
      <App />
    </ApprovalStatusProvider>
  </React.StrictMode>
);
