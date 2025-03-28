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
import DashboardLayouts from "../layouts/DashboardLayouts";
import Profile from "../components/dashboard/Profile";
import EditProfile from "../components/dashboard/EditProfile";
import Membership from "../components/dashboard/Membership";

const Routers = () => {
  return (
    <div>
      <Routes>
        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp" element={<OTP />} />

        {/* Main Content */}
        <Route element={<Index />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/order/:slug" element={<OrderDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/history/:phone" element={<History />} />
          <Route path="/payment/:orderId" element={<Payment />} />
        </Route>

        {/* Dashboard Profile */}
        <Route element={<DashboardLayouts />}>
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/dashboard/edit-profile" element={<EditProfile />} />
          <Route
            path="/dashboard/upgrade-membership"
            element={<Membership />}
          />
        </Route>
      </Routes>
    </div>
  );
};

export default Routers;
// dev
