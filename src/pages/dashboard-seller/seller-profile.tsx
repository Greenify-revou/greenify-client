import React from "react";
import dynamic from "next/dynamic";
import SellerProfileContent from "@/src/components/dashboardSeller/SellerProfileContent";

// Dynamically import components with SSR disabled
const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });


const SellerProfilePage = () => {
  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <SellerProfileContent />
      </div>
    </div>
  );
};

export default SellerProfilePage;