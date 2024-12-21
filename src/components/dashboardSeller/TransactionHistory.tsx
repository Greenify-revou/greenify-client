import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface Transaction {
  id: number;
  transactionId: string;
  amount: string;
  status: string;
  createdAt: string;
}

const TransactionHistory: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const columns: TableColumn<Transaction>[] = [
    { name: "Transaction ID", selector: (row) => row.transactionId, sortable: true },
    { name: "Amount", selector: (row) => row.amount, sortable: true },
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
    { name: "Created At", selector: (row) => new Date(row.createdAt).toLocaleString(), sortable: true },
  ];

  return (
    <DataTable
      columns={columns}
      data={transactions}
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
  );
};

export default TransactionHistory;
