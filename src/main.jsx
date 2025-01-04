import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { SERVER_BASE_URL } from "./constants/server.constants.js";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
        <ToastContainer position="top-right" autoClose={1500} />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
