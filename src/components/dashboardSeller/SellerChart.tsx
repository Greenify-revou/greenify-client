import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SellerChart = () => {
  // Filter state
  const [filter, setFilter] = useState<"day" | "month" | "year">("month");

  // Data based on filter selection
  const getFilteredData = () => {
    switch (filter) {
      case "day":
        return { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], data: [1000, 1200, 1500, 1100, 1300, 1700, 2000] };
      case "month":
        return { labels: ["Jan", "Feb", "Mar", "Apr", "May"], data: [5000, 8000, 7000, 12000, 9000] };
      case "year":
        return { labels: ["2020", "2021", "2022", "2023", "2024"], data: [60000, 75000, 82000, 94000, 100000] };
      default:
        return { labels: [], data: [] };
    }
  };

  const { labels, data: chartData } = getFilteredData();

  const data = {
    labels,
    datasets: [
      {
        label: "Sales",
        data: chartData,
        fill: true,
        backgroundColor: "rgba(0, 177, 64, 0.1)",
        borderColor: "#00b140",
        borderWidth: 2,
        pointBackgroundColor: "#00b140",
        pointBorderColor: "#FFFFFF",
        pointHoverRadius: 6,
        tension: 0.4,
      },
    ],
  };

  type LegendPosition = "top" | "center" | "left" | "right" | "bottom" | "chartArea";

  const dynamicPosition: LegendPosition = "top";
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: dynamicPosition, // Now TypeScript is happy
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" } },
    },
  };
  

  return (
    <div className="w-full h-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Seller Sales Chart</h2>
        <div>
          <label htmlFor="filter" className="mr-2">Filter by:</label>
          <select
            id="filter"
            className="border rounded p-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value as "day" | "month" | "year")}
          >
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
      <div className="h-72">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SellerChart;
