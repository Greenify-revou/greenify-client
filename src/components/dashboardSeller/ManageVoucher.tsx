import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ReusableModal from "./ReusableModal";
import { API_GET_SELLER_VOUCHER, API_CREATE_VOUCHER, API_UPDATE_VOUCHER, API_GET_ALL_SELLER_PRODUCT } from "@/src/constants/api";
import router from "next/router";

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

interface Product {
    id: number;
    product_name: string;
}

type VoucherInput = Omit<Voucher, "product_name">;

const ManageVouchers = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [form, setForm] = useState<VoucherInput>({
        id: 0,
        kode_voucher: "",
        nama_voucher: "",
        expired: "",
        discount_percentage: 0,
        is_active: true,
        product_id: 0,
        voucher_desc: "",
    });
    const [editingId, setEditingId] = useState<number | null>(null);

    useEffect(() => {
        fetchVouchers();
        fetchProducts();
    }, []);

    const fetchVouchers = async () => {
        try {
            const response = await fetch(API_GET_SELLER_VOUCHER, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const data = await response.json();
            if (data && data.status === "success") {
                setVouchers(data.data);
            } else {
                Swal.fire("Error", "Failed to fetch vouchers", "error");
            }
        } catch {
            Swal.fire("Error", "Failed to fetch vouchers", "error");
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(API_GET_ALL_SELLER_PRODUCT, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const data = await response.json();
            if (data && data.status === "success" && data.data.length > 0) {
                setProducts(data.data);
            } else {
                Swal.fire("No Products Found", "Redirecting to dashboard...", "warning").then(() => {
                    router.push("/dashboard-seller"); // Redirect to dashboard
                });
            }
        } catch {
            Swal.fire("Error", "Failed to fetch products", "error");
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                voucher_desc: "",
            });
            setEditingId(null);
        }
    };

    const closeModal = () => setModalIsOpen(false);

    const handleSubmit = async () => {
        try {
            const method = editingId ? "PUT" : "POST";
            const url = editingId
                ? `${API_UPDATE_VOUCHER}/${editingId}`
                : API_CREATE_VOUCHER;

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
                body: JSON.stringify(form),
            });

            if (response.ok) {
                Swal.fire("Success", editingId ? "Voucher updated successfully" : "Voucher added successfully", "success");
                closeModal();
                fetchVouchers();
            } else {
                Swal.fire("Error", "Failed to submit voucher", "error");
            }
        } catch {
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
                    const response = await fetch(`${API_UPDATE_VOUCHER}/${id}`, {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        },
                    });
                    if (response.ok) {
                        Swal.fire("Deleted!", "Voucher has been deleted.", "success");
                        fetchVouchers();
                    } else {
                        Swal.fire("Error", "Failed to delete voucher", "error");
                    }
                } catch{
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
        { name: "Expired", selector: (row: Voucher) => formatDate(row.expired) },
        { name: "Discount (%)", selector: (row: Voucher) => row.discount_percentage },
        { name: "Status", selector: (row: Voucher) => (row.is_active ? "Active" : "Inactive") },
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
                    <textarea
                        name="voucher_desc"
                        placeholder="Voucher Description"
                        value={form.voucher_desc || ""}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    />
                    <select
                        name="product_id"
                        value={form.product_id}
                        onChange={handleChange}
                        className="w-full border p-3 rounded-md"
                    >
                        <option value="">Select a Product</option>
                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.product_name}
                            </option>
                        ))}
                    </select>
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
