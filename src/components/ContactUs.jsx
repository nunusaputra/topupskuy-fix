import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchSosmed } from "../services";
import { useLocation } from "react-router-dom";

const sosmed = [
  {
    name: "Instagram",
    borderColor: "ring-pink-500",
    icon: <i className="bi bi-instagram text-3xl text-pink-500" />,
  },
  {
    name: "WhatsApp",
    borderColor: "ring-green-500",
    icon: <i className="bi bi-whatsapp text-3xl text-green-500" />,
  },
  {
    name: "Line",
    borderColor: "ring-green-600",
    icon: <i className="bi bi-line text-3xl text-green-600" />,
  },
  {
    name: "Email",
    borderColor: "ring-gray-500",
    icon: <i className="bi bi-envelope text-3xl text-gray-500" />,
  },
  {
    name: "Tiktok",
    borderColor: "ring-black",
    icon: <i className="bi bi-tiktok text-3xl text-black" />,
  },
  {
    name: "Telegram",
    borderColor: "ring-blue-400",
    icon: <i className="bi bi-telegram text-3xl text-blue-400" />,
  },
  {
    name: "YouTube",
    borderColor: "ring-red-700",
    icon: <i className="bi bi-youtube text-3xl text-red-700" />,
  },
];

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [isSosmed, setIsSosmed] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const isOrder = pathname.includes("/order");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSosmed();
      setIsSosmed(response);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`${isOrder ? "bottom-20" : "bottom-5"} fixed right-5 z-[100] `}
    >
      <div className="relative w-12 h-12">
        {/* Sosmed icons horizontal */}
        {isSosmed.map((item, idx) => {
          const x = isMobile ? 0 : -(idx + 1) * 60;
          const y = isMobile ? -(idx + 1) * 60 : 0;

          const icons = sosmed.find(
            (val) => val.name.toLowerCase() === item.name.toLowerCase()
          );

          return (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-12 h-12 flex items-center justify-center rounded-full  ring-2 ${
                icons.borderColor
              } hover:ring-offset-4 hover:ring-offset-[#f3f3f3] cursor-pointer bg-white shadow-md transition-all ease-in-out duration-300 ${
                show
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50 pointer-events-none"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              {icons.icon}
            </a>
          );
        })}

        {/* Tombol Headphone */}
        <div
          className="absolute inset-0 flex items-center justify-center w-12 h-12 rounded-full bg-white ring-2 ring-purple-400 hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <i className="bi bi-chat-dots-fill text-2xl text-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
