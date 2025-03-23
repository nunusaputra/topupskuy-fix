import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/login.png";
import { IoMdClose } from "react-icons/io";

const AuthLayouts = (props) => {
  const { type, children, title } = props;
  return (
    <div className="w-full min-h-screen bg-primary background-dots">
      <div className="w-full max-h-screen">
        <div className="md:flex ">
          <div className="relative w-full flex flex-col md:flex-none justify-center md:w-[40%] min-h-screen px-4 py-8">
            <div className="w-full h-full p-2">
              <a href="/">
                <div className="icon-close w-10 h-10 mb-3 rounded-full bg-slate-800/90 flex items-center justify-center group ring-2 ring-offset-0 ring-slate-600 cursor-pointer hover:ring-offset-4 hover:ring-offset-primary transition-all duration-300">
                  <IoMdClose className="text-2xl text-white group-hover:scale-125 transition-all duration-300" />
                </div>
              </a>
              <div className="w-full mt-5 md:mt-0 h-[90%] flex flex-col justify-center items-center px-2 lg:px-10 xl:px-16 py-4">
                <div className="w-full h-full flex flex-col justify-center gap-5">
                  <div className="flex flex-col gap-2">
                    <h1 className="mt-5 md:mt-0 text-3xl md:text-2xl lg:text-3xl font-semibold text-white">
                      {title}
                    </h1>
                    {type === "login" ? (
                      <p className="text-xs lg:text-sm  text-white">
                        Masuk dengan akun yang telah kamu daftarkan
                      </p>
                    ) : (
                      <p className="text-xs lg:text-sm text-white">
                        Masukan informasi pendaftaran yang valid
                      </p>
                    )}
                  </div>
                  <div className="mt-5">
                    {children}
                    <Navigation type={type} />
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        Lupa Password?{" "}
        <Link
          className="text-white hover:text-seventh font-bold"
        >
          Klik disini
        </Link>
      </p>
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
