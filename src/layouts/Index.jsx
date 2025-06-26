import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchColorTemplate, fetchMetadata } from "../services";

const Index = () => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 60,
  });

  const { data: colorTemplate } = useQuery({
    queryFn: fetchColorTemplate,
  });

  useEffect(() => {
    const fetchColor = async () => {
      try {
        if (colorTemplate != null || colorTemplate != undefined) {
          localStorage.setItem("theme-colors", JSON.stringify(colorTemplate));
          setThemeColors(colorTemplate);
        }
      } catch (error) {
        const savedColors = localStorage.getItem("theme-colors");
        if (savedColors) {
          setThemeColors(JSON.parse(savedColors));
        }
      }
    };

    fetchColor();
  }, [colorTemplate]);

  function hexToRgba(hex, opacity = 1) {
    hex = hex?.replace("#", "");
    const r = parseInt(hex?.substring(0, 2), 16);
    const g = parseInt(hex?.substring(2, 4), 16);
    const b = parseInt(hex?.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }

  const setThemeColors = (colors) => {
    if (colors) {
      document.documentElement.style.setProperty(
        "--background-primary",
        colors[3].value_
      );
      document.documentElement.style.setProperty(
        "--background-secondary",
        colors[4].value_
      );
      document.documentElement.style.setProperty(
        "--button-auth",
        colors[9].value_
      );
      document.documentElement.style.setProperty(
        "--dots-color",
        colors[7].value_
      );

      const auroraColors = colors
        .filter((color) => color.id.startsWith("AURORA_ANIMATION_COLOR_"))
        .map((color) => color.value_);

      auroraColors.forEach((color, index) => {
        document.documentElement.style.setProperty(
          `--aurora-${index + 1}`,
          color
        );
      });

      document.documentElement.style.setProperty(
        "--border-color",
        colors[5].value_
      );
      document.documentElement.style.setProperty(
        "--order-color",
        colors[8].value_
      );
      document.documentElement.style.setProperty(
        "--card-color",
        colors[6].value_
      );

      document.documentElement.style.setProperty(
        "--background-secondary-opacity",
        hexToRgba(colors[4].value_, 0.8)
      );

      document.documentElement.style.setProperty(
        "--card-color-opacity-one",
        hexToRgba(colors[6].value_, 0.3)
      );

      document.documentElement.style.setProperty(
        "--card-color-opacity-two",
        hexToRgba(colors[6].value_, 0.2)
      );
    }
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
  }, [metadata]);

  return (
    <div className="min-h-screen bg-primary background-dots">
      <Navbar metadata={metadata?.images} />
      <div className="">
        <Outlet />
      </div>
      <Footer images={metadata?.images} settings={metadata?.settings} />
    </div>
  );
};

export default Index;
