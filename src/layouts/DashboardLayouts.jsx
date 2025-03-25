import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchMetadata } from "../services";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayouts = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 21600000, // refresh dalam 6 jam
  });

  return (
    <div className="min-h-screen bg-primary background-dots">
      <Navbar metadata={metadata?.images} />
      <section className="container relative w-full min-h-screen mx-auto lg:flex lg:gap-10">
        <Sidebar />
        <Outlet />
      </section>
      <Footer metadata={metadata} />
    </div>
  );
};

export default DashboardLayouts;
