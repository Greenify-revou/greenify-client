import React from "react";
import dynamic from "next/dynamic";
import ProtectedRoute from "@/src/components/ProtectedRoute";

// Dynamically import components
const Sidebar = dynamic(() => import("@/src/components/dashboardSeller/SideBar"), { ssr: false });
const ManageProducts = dynamic(() => import("@/src/components/dashboardSeller/ManageProduct"), { ssr: false });

const ProductPage = () => {
  return (
    <ProtectedRoute>
      <div className="flex bg-[#F9FAFB] min-h-screen">
        <Sidebar />
        <div className="flex-1 overflow-auto p-6">
          <ManageProducts />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProductPage;
