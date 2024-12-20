import React from "react";
import Link from "next/link";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active }) => {
  return (
    <Link href={href}>
      <div
        className={`flex items-center space-x-2 px-4 py-2 rounded cursor-pointer ${
          active ? "bg-gray-100 text-green-500 font-bold" : "hover:bg-gray-50"
        }`}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
};

export default NavItem;
