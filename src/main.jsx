import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import App from "./App";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{
    duration: 2500,

    style: {
      background: "#0f172a",
      color: "#e2e8f0",

      border:
        "1px solid rgba(34,211,238,0.15)",

      borderRadius: "20px",

      padding: "14px 18px",

      marginTop: "20px",

      backdropFilter: "blur(16px)",

      boxShadow:
        "0 10px 30px rgba(0,0,0,0.35)",

      fontWeight: "500",
    },

    success: {
      iconTheme: {
        primary: "#22d3ee",
        secondary: "#082f49",
      },
    },

    error: {
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    },
  }}
/>
  </StrictMode>
);