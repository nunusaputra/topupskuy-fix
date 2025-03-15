import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../layouts/Index";
import LandingPage from "../pages/LandingPage";
import OrderDetail from "../pages/OrderDetail";
import Transaction from "../components/Transaction";
import History from "../components/History";
import Payment from "../components/Payment";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route element={<Index />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order/:slug" element={<OrderDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history/:phone" element={<History />} />
          <Route path="/payment" element={<Payment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
