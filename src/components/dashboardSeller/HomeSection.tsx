import React from "react";
import SellerChart from "./SellerChart";
import TransactionHistory from "./TransactionHistory";

const HomeSection: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] h-[calc(100vh-100px)] overflow-y-auto">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Selling" value="Rp 10,000,000" />
        <Card title="Total Buyers" value="512" />
        <Card title="Total Rating" value="4.5/5" />
        <Card title="Pending Sales" value="25" />
      </div>

      {/* Sales Graphic */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>
        <SellerChart />
      </div>

      {/* Transaction History */}
      <TransactionHistory />
    </div>
  );
};

const Card = ({ title, value }: { title: string; value: string }) => (
  <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-200 text-center hover:shadow-2xl transition duration-300">
    <h3 className="text-gray-500 text-sm uppercase font-medium">{title}</h3>
    <p className="text-3xl font-bold text-[#00b140] mt-2">{value}</p>
  </div>
);

export default HomeSection;
