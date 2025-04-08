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
    staleTime: 21600000,
  });

  useEffect(() => {
    if (metadata?.settings[0].value_) {
      document.title = metadata?.settings[0].value_;
    }

    if (metadata?.images[1].value_) {
      const link =
        document.querySelector("link[rel~='icon']") ||
        document.createElement("link");
      link.rel = "icon";
      link.href = metadata?.images[1].value_;
      document.getElementsByTagName("head")[0].appendChild(link);
    }
  }, []);

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
