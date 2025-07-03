import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/login.png";

import { useQuery } from "@tanstack/react-query";
import { fetchMetadata } from "../services";
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

const AuthLayouts = (props) => {
  const { data: metadata } = useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
    staleTime: 21600000,
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

  const { type, children, title } = props;
  return (
    <div className="w-full min-h-screen bg-primary background-dots">
      <div className="w-full max-h-screen">
        <div className="md:flex ">
          <div className="relative w-full flex flex-col md:flex-none justify-center md:w-[40%] min-h-screen px-4 py-8">
            <div className="w-full h-full p-2">
              <a href="/">
                <div className="icon-close w-10 h-10 mb-3 rounded-full bg-slate-800/90 flex items-center justify-center group ring-2 ring-offset-0 ring-slate-600 cursor-pointer hover:ring-offset-4 hover:ring-offset-primary transition-all duration-300">
                  <i className="bi bi-x-lg text-2xl text-white group-hover:scale-125 transition-all duration-300 inline-block" />
                </div>
              </a>
              <div className="w-full mt-5 md:mt-0 h-[90%] flex flex-col justify-center items-center px-2 lg:px-10 xl:px-16 py-4">
                <div className="w-full h-full flex flex-col justify-center gap-5">
                  <div className="flex flex-col gap-2">
                    <h1 className="mt-5 md:mt-0 text-3xl md:text-2xl lg:text-3xl font-bold text-white">
                      {title}
                    </h1>
                    {type === "login" && (
                      <p className="text-xs lg:text-sm  text-white">
                        Masuk dengan akun yang telah kamu daftarkan
                      </p>
                    )}
                    {type === "register" && (
                      <p className="text-xs lg:text-sm text-white">
                        Masukan informasi pendaftaran yang valid
                      </p>
                    )}
                    {type === "forgot" && (
                      <p className="text-xs lg:text-sm text-white">
                        It's okayy bro, kamu cukup mengirimkan nomor whatsapp
                        kamu dan kami akan mengirimkan kode yang dapat kamu
                        gunakan sebagai password baru untuk kamu login.
                      </p>
                    )}
                    {type === "otp" && (
                      <p className="text-xs lg:text-sm text-white">
                        Silahkan periksa whatsapp kamu, kami sudah mengirimkan
                        kode OTP ke nomor whatsapp kamu.
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    {children}
                    {(type === "login" || type === "register") && (
                      <Navigation type={type} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ContactUs />
          <div className="hidden md:block w-[60%] max-h-screen bg-red-500 overflow-hidden">
            <img src={banner} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Navigation = ({ type }) => {
  if (type === "login" || type === "Login") {
    return (
      <>
        <p className="text-xs lg:text-sm text-white text-center mt-5">
          Tidak memiliki akun?{" "}
          <Link
            to="/register"
            className="text-white hover:text-seventh font-bold"
          >
            Daftar disini
          </Link>
        </p>
      </>
    );
  } else {
    return (
      <p className="text-xs lg:text-sm text-white text-center mt-5">
        Sudah punya akun?{" "}
        <Link to="/login" className="text-white hover:text-seventh font-bold">
          Login disini
        </Link>
      </p>
    );
  }
};
export default AuthLayouts;
