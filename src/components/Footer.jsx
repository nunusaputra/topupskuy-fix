import React from "react";
import logo from "../assets/images/logo-fix.png";

const Footer = () => {
  return (
    <div className="relative mt-16 bg-secondary/40 backdrop-blur-2xl">
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Go home"
              title="Company"
              className="inline-flex items-center"
            >
              <div className="w-14 h-14">
                <img src={logo} alt="" className="w-full h-full object-cover" />
              </div>
              <span className="ml-2 text-xl font-bold tracking-wide uppercase text-white">
                Barge Ghost
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-white">
                Jl. Kemanggisan Ilir Gg. 3 No.25, RT.4/RW.13, Palmerah, Kec.
                Palmerah, Kemanggisan, Jakarta Barat, 11480, ID
              </p>
              <p className="mt-4 text-sm text-white">
                Top-up cepat, aman, dan murah! Nikmati saldo langsung masuk
                tanpa ribet. Level up sekarang dan jadilah yang terdepan di
                setiap permainan!" 🚀🎮
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-white">
                Kemitraan
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Reseller
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Web Topup
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Affiliasi
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-white">Sitemap</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Topup
                  </a>
                </li>
                <li>
                  <a
                    href="/transaction"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Check Transaction
                  </a>
                </li>
                <li>
                  <a
                    href="/history"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    History
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Calculator MLBB
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Login
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-white">Support</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Email
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Line
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold tracking-wide text-white">
                Legalitas
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Kebijakan Pribadi
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Syarat & Ketentuan
                  </a>
                </li>
                <li>
                  <a
                    href="/"
                    className="transition-all text-sm duration-300 text-white hover:text-purple-300"
                  >
                    Forum
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-deep-purple-accent-200 sm:flex-row">
          <p className="text-sm text-white">
            © Copyright 2025 Lorem Inc. All rights reserved.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a href="/">
              <i className="bi bi-twitter-x text-white transition-colors duration-300 tall text-smep-purple-100 hover:text-purple-300"></i>
            </a>
            <a href="/">
              <i className="bi bi-instagram transition-colors duration-300 tall text-smep-purple-100 text-white hover:text-purple-300"></i>
            </a>
            <a href="/">
              <i className="bi bi-facebook text-lg transition-colors duration-300 tall text-smep-purple-100 text-white hover:text-purple-300"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
