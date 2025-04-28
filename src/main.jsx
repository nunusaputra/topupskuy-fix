import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer
      theme="colored"
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover={false}
    />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
