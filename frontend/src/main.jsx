import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "@fontsource/inter";
import "./index.css";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Toaster
  position="top-right"
  toastOptions={{
    duration: 2500,
    style: {
      borderRadius: "12px",
      background: "#1e293b",
      color: "#fff",
    },
  }}
/>
  </React.StrictMode>
);