import React from "react";
import dynamic from "next/dynamic";

const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });
const ManageVouchers = dynamic(() => import("@/src/components/dashboardSeller/ManageVoucher"), { ssr: false });

const VoucherPage = () => {
  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <ManageVouchers />
      </div>
    </div>
  );
};

export default VoucherPage;