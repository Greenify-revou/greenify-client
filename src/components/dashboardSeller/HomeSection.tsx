import React, { useEffect, useState } from "react";
import TransactionHistory from "./TransactionHistory";
import { API_SELLER_HISTORY, API_SELLER_METRIC } from "@/src/constants/api";

interface Metrics {
  total_selling: string;
  total_buyers: string;
  total_rating: string;
  pending_sales: string;
}

const HomeSection: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    total_selling: "Rp 0",
    total_buyers: "0",
    total_rating: "0/5",
    pending_sales: "0",
  });

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Metrics
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const metricsResponse = await fetch(API_SELLER_METRIC, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const metricsData = await metricsResponse.json();

        if (metricsData.success) {
          setMetrics({
            total_selling: `Rp ${metricsData.data.total_selling.toLocaleString()}`,
            total_buyers: metricsData.data.total_buyers.toString(),
            total_rating: `${metricsData.data.total_rating}/5`,
            pending_sales: metricsData.data.pending_sales.toString(),
          });
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const transactionsResponse = await fetch(API_SELLER_HISTORY, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const transactionsData = await transactionsResponse.json();

        if (transactionsData.data) {
          setTransactions(transactionsData.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    fetchTransactions();
  }, []);

  return (
    <div className="p-6 space-y-6 bg-[#F9FAFB] h-[calc(100vh-100px)] overflow-y-auto">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Selling" value={metrics.total_selling} />
        <Card title="Total Buyers" value={metrics.total_buyers} />
        <Card title="Total Rating" value={metrics.total_rating} />
        <Card title="Pending Sales" value={metrics.pending_sales} />
      </div>

      {/* Sales Graphic
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Overview</h2>
        <SellerChart />
      </div> */}

      {/* Transaction History */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <TransactionHistory transactions={transactions} />
        )}
      </div>
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