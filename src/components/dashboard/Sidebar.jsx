import React from "react";

const Sidebar = () => {
  return (
    <div className="hidden lg:block lg:w-[20%] lg:min-h-screen">
      <div className="w-full flex flex-col gap-3 bg-secondary/80 backdrop-blur-4xl rounded-xl lg:overflow-auto lg:sticky lg:top-32 p-3">
        <a href="/dashboard/profile">
          <div className="p-2 flex items-center gap-3">
            <i className="bi bi-grid-1x2 text-sm text-white" />
            <h1 className="text-sm text-white font-semibold">Dashboard</h1>
          </div>
        </a>
        <a href="/dashboard/upgrade-membership">
          <div className="p-2 flex items-center gap-2">
            <i className="bi bi-coin text-lg text-white" />
            <h1 className="text-sm text-white font-semibold">Membership</h1>
          </div>
        </a>
        <a href="/dashboard/riwayat-transaksi">
          <div className="p-2 flex items-center gap-2">
            <i className="bi bi-cart-check text-lg text-white" />
            <h1 className="text-sm text-white font-semibold">Transaksi</h1>
          </div>
        </a>
        <a href="/dashboard/riwayat-mutasi">
          <div className="p-2 flex items-center gap-2">
            <i className="bi bi-clipboard-check text-lg text-white" />
            <h1 className="text-sm text-white font-semibold">Mutasi</h1>
          </div>
        </a>
        <div className="p-2 flex items-center gap-2">
          <i className="bi bi-box-arrow-right text-lg text-red-400" />
          <h1 className="text-sm text-red-400 font-semibold">Keluar</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
