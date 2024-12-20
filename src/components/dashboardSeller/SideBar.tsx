import React, { useEffect, useState } from "react";
import { FiHome, FiBox, FiTag, FiBarChart2 } from "react-icons/fi";
import NavItem from "./NavItem";
import { useRouter } from "next/router";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true); // Ensure client-side rendering
  }, []);

  return (
    <aside className="w-72 h-screen bg-white text-gray-800 border-r border-gray-200 flex flex-col shadow-sm">
      {/* Header */}
      <div className="flex justify-center text-2xl font-bold py-6 border-b border-gray-200">
        <span className="text-[#00b140]">Greenify</span>
        <span className="text-gray-500"> Seller</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-4 space-y-2">
        {hydrated && (
          <>
            <NavItem
              icon={<FiHome />}
              label="Home"
              href="/dashboard-seller"
              active={router.pathname === "/dashboard-seller"}
            />
            <NavItem
              icon={<FiTag />}
              label="Voucher"
              href="/dashboard-seller/voucherPage"
              active={router.pathname === "/dashboard-seller/voucherPage"}
            />
            <NavItem
              icon={<FiBox />}
              label="Product"
              href="/dashboard-seller/productPage"
              active={router.pathname === "/dashboard-seller/productPage"}
            />
            <NavItem
              icon={<FiBarChart2 />}
              label="Transaction History"
              href="/dashboard-seller/transaction-history"
              active={router.pathname === "/dashboard-seller/transaction-history"}
            />
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
