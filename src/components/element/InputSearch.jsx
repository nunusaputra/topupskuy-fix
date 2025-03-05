import React from "react";
import { IoSearchOutline } from "react-icons/io5";

const InputSearch = () => {
  return (
    <label htmlFor="search" className="relative block">
      <span className="sr-only">Search</span>
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <IoSearchOutline className="w-5 h-5" />
      </span>
      <input
        type="text"
        name="search"
        placeholder="Search for anything..."
        className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2.5 pl-9 pr-3 shadow-sm focus:outline-none focus:border-slate-800 focus:ring-slate-800 focus:ring-1 sm:text-sm"
      />
    </label>
  );
};

export default InputSearch;
