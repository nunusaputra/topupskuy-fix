import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchSosmed } from "../services";
import { useLocation } from "react-router-dom";

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [isSosmed, setIsSosmed] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const isOrder = pathname.includes("/order");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOrder) return;

    const handleButton = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleButton);
    handleButton();

    return () => window.removeEventListener("scroll", handleButton);
  }, [isOrder]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchSosmed();
      setIsSosmed(response);
    };

    fetchData();
  }, []);

  const filterContact = isSosmed.filter((item) => item.isContact === true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mediaQuery.matches);

    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return (
    <div
      className={`fixed right-5 z-[100] transition-all duration-300`}
      style={{
        bottom: visible ? `5rem` : `1.25rem`,
      }}
    >
      <div className="relative w-12 h-12">
        {/* Sosmed icons horizontal */}
        {filterContact.map((item, idx) => {
          const x = 0;
          const y = -(idx + 1) * 60;

          return (
            <a
              key={idx}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-12 h-12 flex items-center justify-center rounded-full  ring-2 ring-seventh hover:ring-offset-4 hover:ring-offset-[#f3f3f3] cursor-pointer bg-white shadow-md transition-all ease-in-out duration-300 ${
                show
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50 pointer-events-none"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              <i className={`${item.logo} text-3xl text-seventh`} />
            </a>
          );
        })}

        {/* Tombol Headphone */}
        <div
          className="absolute inset-0 flex items-center justify-center w-12 h-12 rounded-full bg-white ring-2 ring-seventh hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <i className="bi bi-chat-dots-fill text-2xl text-seventh" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
