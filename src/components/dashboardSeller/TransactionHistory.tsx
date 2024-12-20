import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

// Define the shape of the data
interface Transaction {
  id: number;
  transactionId: string;
  amount: string;
  status: string;
}

const data: Transaction[] = [
  { id: 1, transactionId: "#12345", amount: "Rp 500,000", status: "Pending" },
  { id: 2, transactionId: "#12346", amount: "Rp 1,000,000", status: "Complete" },
  { id: 3, transactionId: "#12347", amount: "Rp 750,000", status: "Pending" },
  { id: 4, transactionId: "#12348", amount: "Rp 300,000", status: "Complete" },
];

const columns: TableColumn<Transaction>[] = [
  {
    name: "Transaction ID",
    selector: (row) => row.transactionId,
    sortable: true,
  },
  {
    name: "Amount",
    selector: (row) => row.amount,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`font-semibold ${
          row.status === "Complete" ? "text-green-500" : "text-yellow-500"
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
];

const TransactionHistory = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Transaction History</h2>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#F3F4F6",
              fontWeight: "bold",
              fontSize: "14px",
              color: "#374151",
            },
          },
        }}
      />
    </div>
  );
};

export default TransactionHistory;
