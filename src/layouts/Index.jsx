import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";
import axios from "axios";

const Index = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 60,
  });

  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await axios.get(
          "https://680432d879cb28fb3f5a8bb7.mockapi.io/color-picker"
        );
        const colors = response.data[0];

        localStorage.setItem("theme-colors", JSON.stringify(colors));

        setThemeColors(colors);
      } catch (error) {
        console.log("Gagal ambil warna:", error);

        const savedColors = localStorage.getItem("theme-colors");
        if (savedColors) {
          setThemeColors(JSON.parse(savedColors));
        }
      }
    };

    fetchColor();
  }, []);

  function hexToRgba(hex, opacity = 1) {
    hex = hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const setThemeColors = (colors) => {
    document.documentElement.style.setProperty(
      "--background-primary",
      colors.background_primary
    );
    document.documentElement.style.setProperty(
      "--background-secondary",
      colors.background_secondary
    );
    document.documentElement.style.setProperty(
      "--button-auth",
      colors.button_login
    );
    document.documentElement.style.setProperty(
      "--dots-color",
      colors.dots_background
    );

    colors.aurora_color?.forEach((color, index) => {
      document.documentElement.style.setProperty(`--aurora-${index}`, color);
    });

    document.documentElement.style.setProperty(
      "--border-color",
      colors.border_color
    );
    document.documentElement.style.setProperty(
      "--order-color",
      colors.order_color
    );
    document.documentElement.style.setProperty(
      "--card-color",
      colors.card_color
    );

    document.documentElement.style.setProperty(
      "--background-secondary-opacity",
      hexToRgba(colors.background_secondary, 0.8)
    );

    document.documentElement.style.setProperty(
      "--card-color-opacity-one",
      hexToRgba(colors.card_color, 0.3)
    );

    document.documentElement.style.setProperty(
      "--card-color-opacity-two",
      hexToRgba(colors.card_color, 0.2)
    );
  };

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
