import React from "react";
import { LuLayoutDashboard, LuLogOut } from "react-icons/lu";
import { GiTakeMyMoney } from "react-icons/gi";
import { LiaDollySolid } from "react-icons/lia";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";

const Sidebar = () => {
  return (
    <div className="hidden lg:block lg:w-[20%] lg:min-h-screen">
      <div className="w-full flex flex-col gap-5 bg-secondary/80 backdrop-blur-4xl rounded-xl lg:overflow-auto lg:sticky lg:top-32 p-3">
        <div className="p-2 flex items-center gap-2">
          <LuLayoutDashboard className="text-lg text-white" />
          <h1 className="text-sm text-white font-semibold">Dashboard</h1>
        </div>
        <div className="p-2 flex items-center gap-2">
          <GiTakeMyMoney className="text-lg text-white" />
          <h1 className="text-sm text-white font-semibold">Membership</h1>
        </div>
        <div className="p-2 flex items-center gap-2">
          <LiaDollySolid className="text-lg text-white" />
          <h1 className="text-sm text-white font-semibold">Transaksi</h1>
        </div>
        <div className="p-2 flex items-center gap-2">
          <LiaFileInvoiceDollarSolid className="text-lg text-white" />
          <h1 className="text-sm text-white font-semibold">Mutasi</h1>
        </div>
        <div className="p-2 flex items-center gap-2">
          <LuLogOut className="text-lg text-white" />
          <h1 className="text-sm text-white font-semibold">Keluar</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
