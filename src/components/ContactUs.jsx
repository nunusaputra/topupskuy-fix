import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const sosmed = [
  {
    name: "Instagram",
    path: "",
    icon: <i className="bi bi-instagram text-2xl text-pink-500" />,
  },
  {
    name: "WhatsApp",
    path: "",
    icon: <i className="bi bi-whatsapp text-2xl text-green-500" />,
  },
  {
    name: "Line",
    path: "",
    icon: <i className="bi bi-line text-2xl text-green-600" />,
  },
];

const ContactUs = () => {
  const [show, setShow] = useState(false);
  const radius = 80; // jarak dari tombol headphone
  const { pathname } = useLocation();

  const isOrder = pathname.includes("/order");
  console.log(isOrder);

  return (
    <div
      className={`${isOrder ? "bottom-20" : "bottom-5"} fixed right-5 z-[100] `}
    >
      <div className="relative w-12 h-12">
        {/* Sosmed icons melingkar */}
        {sosmed.map((item, idx) => {
          const angle = -(150 / sosmed.length) * idx - 90; // mulai dari atas
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <a
              key={idx}
              href={item.path}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md shadow-black transition-all duration-500 ${
                show
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-50 pointer-events-none"
              }`}
              style={{
                transform: `translate(${x}px, ${y}px)`,
                transitionDelay: `${idx * 150}ms`,
              }}
            >
              {item.icon}
            </a>
          );
        })}

        {/* Tombol Headphone */}
        <div
          className="absolute inset-0 flex items-center justify-center w-12 h-12 rounded-full bg-white ring-2 ring-purple-400 shadow-md shadow-black hover:ring-offset-4 hover:ring-offset-[#060911] transition-all duration-300 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <i className="bi bi-chat-dots-fill text-2xl text-purple-400" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
