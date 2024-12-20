import React from "react";
import dynamic from "next/dynamic";

// Dynamically import components
const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });
const ManageProducts = dynamic(() => import("@/src/components/dashboardSeller/ManageProduct"), { ssr: false });

const ProductPage = () => {
  return (
    <div className="flex bg-[#F9FAFB]">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6">
        <ManageProducts />
      </div>
    </div>
  );
};

export default ProductPage;
