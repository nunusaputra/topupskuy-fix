import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";

const Index = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 60
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

    if(metadata?.colorTemplate) {
      console.log(metadata?.colorTemplate[7].value_)
      const dynamicColor = metadata?.colorTemplate[7].value_;
      document.documentElement.style.setProperty('--dot-color', dynamicColor);
    }
  }, [metadata]);

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
