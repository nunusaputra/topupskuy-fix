import React from "react";
import { Route, Routes } from "react-router-dom";
import Index from "../layouts/Index";
import LandingPage from "../pages/LandingPage";
import OrderDetail from "../pages/OrderDetail";
import Transaction from "../components/Transaction";
import History from "../components/History";
import Payment from "../components/Payment";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import OTP from "../pages/OTP";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />
        <Route element={<Index />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order/:slug" element={<OrderDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history/:phone" element={<History />} />
          <Route path="/payment/:orderId" element={<Payment />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
// dev
