import React from "react";
import { Link } from "react-router-dom";
import banner from "../assets/images/login.png";
import { IoMdClose } from "react-icons/io";

const AuthLayouts = (props) => {
  const { type, children, title } = props;
  return (
    <div className="w-full min-h-screen bg-primary background-dots">
      <div className="w-full min-h-screen">
        <div className="flex ">
          <div className="w-[40%] min-h-screen bg-white px-4 py-8">
            <div className="w-full h-full p-2 bg-orange-500">
              <div className="w-10 h-10 rounded-full bg-slate-800/90 flex items-center justify-center group ring-2 ring-offset-0 ring-slate-800 cursor-pointer hover:ring-offset-4 hover:ring-offset-primary transition-all duration-300">
                <IoMdClose className="text-2xl text-white group-hover:scale-125 transition-all duration-300" />
              </div>
              <div className="w-full h-full bg-blue-500 "></div>
            </div>
          </div>
          <div className="w-[60%] max-h-screen bg-red-500 overflow-hidden">
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
      <p className="text-sm text-center mt-5">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-primary hover:text-blue-800 font-bold"
        >
          Register
        </Link>
      </p>
    );
  } else {
    return (
      <p className="text-sm text-center mt-5">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-primary hover:text-blue-800 font-bold"
        >
          Login
        </Link>
      </p>
    );
  }
};
export default AuthLayouts;
