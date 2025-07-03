import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchColorTemplate, fetchMetadata } from "../services";
import ContactUs from "../components/ContactUs";

const colorTemplate = [
  {
    id: "AURORA_ANIMATION_COLOR_1",
    value_: "#005eff",
    notes: null,
    category: "color-template",
  },
  {
    id: "AURORA_ANIMATION_COLOR_2",
    value_: "#ffcc00",
    notes: null,
    category: "color-template",
  },
  {
    id: "AURORA_ANIMATION_COLOR_3",
    value_: "#38a9ff",
    notes: null,
    category: "color-template",
  },
  {
    id: "BACKGROUND_COLOR",
    value_: "#0a0a0a",
    notes: null,
    category: "color-template",
  },
  {
    id: "BACKGROUND_CONTENT_COLOR",
    value_: "#272730",
    notes: null,
    category: "color-template",
  },
  {
    id: "BORDER_COLOR_PRODUCT",
    value_: "#ffffff",
    notes: null,
    category: "color-template",
  },
  {
    id: "CARD_CONTENT_COLOR",
    value_: "#2b2b2b",
    notes: null,
    category: "color-template",
  },
  {
    id: "DOT_ANIMATION_COLOR",
    value_: "#a2ae4c",
    notes: null,
    category: "color-template",
  },
  {
    id: "HOVER_CARD_ALL_BUTTON_COLOR",
    value_: "#f5ec00",
    notes: null,
    category: "color-template",
  },
  {
    id: "LOGIN_REGISTER_COLOR",
    value_: "#ffffff",
    notes: null,
    category: "color-template",
  },
];

const metadata = {
  colorTemplate: [
    {
      id: "AURORA_ANIMATION_COLOR_1",
      value_: "#005eff",
      notes: null,
      category: "color-template",
    },
    {
      id: "AURORA_ANIMATION_COLOR_2",
      value_: "#ffcc00",
      notes: null,
      category: "color-template",
    },
    {
      id: "AURORA_ANIMATION_COLOR_3",
      value_: "#38a9ff",
      notes: null,
      category: "color-template",
    },
    {
      id: "BACKGROUND_COLOR",
      value_: "#0a0a0a",
      notes: null,
      category: "color-template",
    },
    {
      id: "BACKGROUND_CONTENT_COLOR",
      value_: "#272730",
      notes: null,
      category: "color-template",
    },
    {
      id: "BORDER_COLOR_PRODUCT",
      value_: "#ffffff",
      notes: null,
      category: "color-template",
    },
    {
      id: "CARD_CONTENT_COLOR",
      value_: "#2b2b2b",
      notes: null,
      category: "color-template",
    },
    {
      id: "DOT_ANIMATION_COLOR",
      value_: "#a2ae4c",
      notes: null,
      category: "color-template",
    },
    {
      id: "HOVER_CARD_ALL_BUTTON_COLOR",
      value_: "#f5ec00",
      notes: null,
      category: "color-template",
    },
    {
      id: "LOGIN_REGISTER_COLOR",
      value_: "#ffffff",
      notes: null,
      category: "color-template",
    },
  ],
  banners: [
    {
      id: 1,
      isActive: true,
      asset: {
        id: 402,
        name: "temp14976251806973449729banner_fix-01 (1)",
        path: "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730426001/xkvu3zljobch1v2vxocw.webp",
        isDelete: false,
      },
    },
    {
      id: 2,
      isActive: true,
      asset: {
        id: 482,
        name: "temp6873976416419736645TOPUPSKUYY banner 2",
        path: "https://res.cloudinary.com/dkvaaxokv/image/upload/v1731040020/cvpktwbtrmdhpearl4hk.webp",
        isDelete: false,
      },
    },
  ],
  images: [
    {
      id: "",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "FAVICON",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "IMAGE_BANNER_1",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730426001/xkvu3zljobch1v2vxocw.webp",
      notes: null,
      category: "image",
    },
    {
      id: "IMAGE_BANNER_2",
      value_:
        "https://res.cloudinary.com/dkvaaxokv/image/upload/v1731040020/cvpktwbtrmdhpearl4hk.webp",
      notes: null,
      category: "image",
    },
    {
      id: "LOGO-FOOTER",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
    {
      id: "LOGO-HEADER",
      value_:
        "https://res.cloudinary.com/dfmqfrfzf/image/upload/v1730363886/idbgcaz9s8w7smf8lemg.webp",
      notes: null,
      category: "image",
    },
  ],
  settings: [
    {
      id: "APPLICATION_NAME",
      value_: "Topupskuyy",
      notes: null,
      category: "settings",
    },
    {
      id: "FOOTER_ADDRESS",
      value_:
        "Kp. Rawa Bebek no.19 RT.001 RW.011 Kelurahan Kota Baru, Kecamatan Bekasi Barat, Kode Pos 17133",
      notes: null,
      category: "settings",
    },
    {
      id: "FOOTER_EMAIL",
      value_: "topupskuyy.info@gmail.com",
      notes: null,
      category: "settings",
    },
  ],
  socialMedias: [
    {
      id: 4,
      name: "Instagram",
      link: "https://www.instagram.com/topupskuyy_id/",
      logo: "bi bi-instagram",
    },
  ],
};

const Index = () => {
  // const { data: metadata } = useQuery({
  //   queryKey: ["metadata"],
  //   queryFn: fetchMetadata,
  //   staleTime: 60,
  // });

  // const { data: colorTemplate } = useQuery({
  //   queryFn: fetchColorTemplate,
  // });

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
        "--order-and-button-color",
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
      <ContactUs />
      <Footer images={metadata?.images} settings={metadata?.settings} />
    </div>
  );
};

export default Index;
