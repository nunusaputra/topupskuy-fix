import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";

const Index = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 21600000, // refresh dalam 6 jam 
  });

  return (
    <div className="min-h-screen bg-primary background-dots">
      <Navbar metadata={metadata?.images} />
      <div className="">
        <Outlet />
      </div>
      <Footer metadata={metadata} />
    </div>
  );
};

export default Index;
