import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import axios from "axios";
import ReusableModal from "./ReusableModal";

interface Voucher {
    id: number;
    kode_voucher: string;
    nama_voucher: string;
    expired: string;
    discount_percentage: number;
    is_active: boolean;
    product_id: number;
    product_name: string;
    voucher_desc: string;
}

const ManageVouchers = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState<Voucher>({
        id: 0,
        kode_voucher: "",
        nama_voucher: "",
        expired: "",
        discount_percentage: 0,
        is_active: true,
        product_id: 0,
        product_name: "",
        voucher_desc: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:5000/api/v1/sellers/get-seller-vouchers/1"
            );
            if (response.data && response.data.status === "success") {
                setVouchers(response.data.data);
            } else {
                Swal.fire("Error", "Failed to fetch vouchers", "error");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Swal.fire("Error", "Failed to fetch vouchers", "error");
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return ""; // Handle invalid dates
        const day = String(date.getUTCDate()).padStart(2, "0");
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const year = date.getUTCFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const openModal = (voucher?: Voucher) => {
        setModalIsOpen(true);
        if (voucher) {
            const expiredDate = voucher.expired
                ? new Date(voucher.expired).toISOString().split("T")[0]
                : "";
            setForm({ ...voucher, expired: expiredDate });
            setEditingId(voucher.id);
        } else {
            setForm({
                id: 0,
                kode_voucher: "",
                nama_voucher: "",
                expired: "",
                discount_percentage: 0,
                is_active: true,
                product_id: 0,
                product_name: "",
                voucher_desc: "",
            });
            setEditingId(null);
        }
    };

    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = async () => {
        try {
            if (editingId) {
                await axios.put(
                    `http://127.0.0.1:5000/api/v1/vouchers/${editingId}`,
                    form
                );
                Swal.fire("Success", "Voucher updated successfully", "success");
            } else {
                await axios.post("http://127.0.0.1:5000/api/v1/vouchers", form);
                Swal.fire("Success", "Voucher added successfully", "success");
            }
            closeModal();
            fetchVouchers();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            Swal.fire("Error", "Failed to submit voucher", "error");
        }
    };

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://127.0.0.1:5000/api/v1/vouchers/${id}`);
                    Swal.fire("Deleted!", "Voucher has been deleted.", "success");
                    fetchVouchers();
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    Swal.fire("Error", "Failed to delete voucher", "error");
                }
            }
        });
    };

    const columns = [
        { name: "ID", selector: (row: Voucher) => row.id, sortable: true },
        { name: "Code", selector: (row: Voucher) => row.kode_voucher },
        { name: "Name", selector: (row: Voucher) => row.nama_voucher },
        { name: "Product", selector: (row: Voucher) => row.product_name },
        { name: "Description", selector: (row: Voucher) => row.voucher_desc },
        {
            name: "Expired",
            selector: (row: Voucher) => formatDate(row.expired),
        },
        { name: "Discount (%)", selector: (row: Voucher) => row.discount_percentage },
        {
            name: "Status",
            selector: (row: Voucher) => (row.is_active ? "Active" : "Inactive"),
        },
        {
            name: "Actions",
            cell: (row: Voucher) => (
                <div className="space-x-2">
                    <button
                        onClick={() => openModal(row)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Vouchers</h2>
            <button
                onClick={() => openModal()}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Voucher
            </button>

            <DataTable columns={columns} data={vouchers} pagination />

            <ReusableModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                title={editingId ? "Edit Voucher" : "Add Voucher"}
            >
                <form className="space-y-4">
                    <input
                        name="kode_voucher"
                        placeholder="Voucher Code"
                        value={form.kode_voucher || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <input
                        name="nama_voucher"
                        placeholder="Voucher Name"
                        value={form.nama_voucher || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <input
                        name="expired"
                        type="date"
                        value={form.expired || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <input
                        name="discount_percentage"
                        type="number"
                        placeholder="Discount (%)"
                        value={form.discount_percentage || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <input
                        name="product_name"
                        placeholder="Product Name"
                        value={form.product_name || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <select
                        name="is_active"
                        value={form.is_active ? "true" : "false"}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </ReusableModal>
        </div>
    );
};

export default ManageVouchers;
