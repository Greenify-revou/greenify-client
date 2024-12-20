import React, { useState, useEffect } from "react";
import Image from "next/image";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import ReusableModal from "./ReusableModal";
import {
    API_GET_ALL_SELLER_PRODUCT,
    API_MANAGE_SELLER_PRODUCT,
    API_CATEGORY,
} from "@/src/constants/api";


interface Product {
    id: number;
    seller_id: number;
    product_name: string;
    price: number;
    discount: number | null;
    product_desc: string;
    stock: number;
    min_stock: number;
    category_id: number;
    eco_point: number;
    recycle_material: number;
    image_url: string | null;
    category_name: string | null; 
}

interface Category {
    id: number;
    category_name: string;
}

const ManageProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [form, setForm] = useState<Product>({
        id: 0,
        seller_id: 1,
        product_name: "",
        price: 0,
        discount: 0,
        product_desc: "",
        stock: 0,
        min_stock: 0,
        category_id: 0,
        eco_point: 0,
        recycle_material: 0,
        image_url: null,
        category_name : null,
    });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    useEffect(() => {
        console.log('products', products)
        console.log('FORMS' ,form)
    }, [products, form]);

    // Fetch Products
    const fetchProducts = async () => {
        setLoading(true); // Start loading
        try {
            const response = await fetch(API_GET_ALL_SELLER_PRODUCT, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                }
            });
    
            if (response.status === 401) {
                Swal.fire("Session Expired", "Your session has expired. Please login again.", "warning");
                // Optional: Clear token from storage and redirect to login
                localStorage.removeItem("token");
                window.location.href = "/login";
                return;
            }
            if (response.status === 422) {
                Swal.fire("Session Expired", "No token provided.", "warning");
            }
            const data = await response.json();
            if (data.status === "success" && data.data) {
                console.log('DATA PROD' ,data.data);
                setProducts(data.data);
                setFilteredProducts(data.data);
            } else {
                Swal.fire("Error", data.message || "Failed to fetch products", "error");
            }
        } catch{
            Swal.fire("Error", "Failed to fetch products", "error");
        } finally {
            setLoading(false); // End loading
        }
    };

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await fetch(API_CATEGORY, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                }
            });
            const data = await response.json();
            if (data.status === "success" && data.data) {
                setCategories(data.data);
            } else {
                Swal.fire("Error", "Failed to fetch categories", "error");
            }
        } catch{
            Swal.fire("Error", "An error occurred while fetching categories", "error");
        }
    };

    // Format Price to Rupiah
    const formatToRupiah = (price: number): string => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(price);
    };

    // Handle Input Change
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // Handle Image Upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        setUploading(true);
        const formData = new FormData();
        formData.append("key", "fc83cc32be937c536fe6b2af550feeea"); // Replace with your API Key
        formData.append("image", file);
    
        try {
            const response = await fetch("https://api.imgbb.com/1/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
    
            if (data?.data?.url) {
                // Fix the URL before updating the form
                const fixedUrl = fixImageUrl(data.data.url);
                setForm({ ...form, image_url: fixedUrl });
                Swal.fire("Success", "Image uploaded successfully!", "success");
            } else {
                Swal.fire("Error", "Failed to upload image", "error");
            }
        } catch {
            Swal.fire("Error", "Failed to upload image", "error");
        } finally {
            setUploading(false);
        }
    };
    
    // Fix URL Function
    const fixImageUrl = (url: string): string => {
        return url.replace('https://i.ibb.co/', 'https://i.ibb.co.com/');
    };

    // Search Functionality
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(term)
        );
        setFilteredProducts(filtered);
    };

    // Open Modal
    const openModal = (product?: Product) => {
        setModalIsOpen(true);
        if (product) {
            setForm(product);
            setEditingId(product.id);
        } else {
            setForm({
                id: 0,
                seller_id: 1,
                product_name: "",
                price: 0,
                discount: 0,
                product_desc: "",
                stock: 0,
                min_stock: 0,
                category_id: 0,
                eco_point: 0,
                recycle_material: 0,
                image_url: null,
                category_name : "",
            });
            setEditingId(null);
        }
    };

    const closeModal = () => setModalIsOpen(false);

    // Submit Form
    const handleSubmit = async () => {
        const requiredFields = [
            { name: "Product Name", value: form.product_name },
            { name: "Price", value: form.price },
            { name: "Product Description", value: form.product_desc },
            { name: "Stock", value: form.stock },
            { name: "Minimum Stock", value: form.min_stock },
            { name: "Category", value: form.category_id },
            { name: "Eco Points", value: form.eco_point },
            { name: "Recycle Material Percentage", value: form.recycle_material },
            { name: "Image", value: form.image_url },
        ];
    
        const emptyField = requiredFields.find((field) => !field.value || field.value === 0);
    
        if (emptyField) {
            Swal.fire("Error", `${emptyField.name} cannot be empty`, "error");
            return;
        }
    
            const url = editingId
            ? `${API_MANAGE_SELLER_PRODUCT}/${editingId}` // Update endpoint
            : `${API_MANAGE_SELLER_PRODUCT}/add-product`; // Add endpoint
        const method = editingId ? "PUT" : "POST";
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
                },
                body: JSON.stringify({
                    seller_id: form.seller_id,
                    product_name: form.product_name,
                    price: form.price,
                    discount: form.discount,
                    product_desc: form.product_desc,
                    stock: form.stock,
                    min_stock: form.min_stock,
                    category_id: form.category_id,
                    eco_point: form.eco_point,
                    recycle_material_percentage: form.recycle_material,
                    image_url: form.image_url,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok && data.status === "success") {
                if (editingId) {
                    // Update the product in the state
                    setProducts((prev) =>
                        prev.map((product) =>
                            product.id === editingId ? { ...form, id: editingId } : product
                        )
                    );
                    Swal.fire("Success", "Product updated successfully", "success");
                } else {
                    // Add the new product to the state
                    const newProduct = { ...data.data };
                    setProducts((prev) => [...prev, newProduct]);
                    setFilteredProducts((prev) => [...prev, newProduct]);
                    Swal.fire("Success", "Product added successfully", "success");
                }
                await fetchProducts();
                closeModal();
            } else {
                Swal.fire("Error", data.message || "Failed to process request", "error");
            }
        } catch{
            Swal.fire("Error", "An error occurred while processing your request", "error");
        }
    };
    

    const columns = [
        { name: "ID", selector: (row: Product) => row.id, sortable: true },
        { name: "Name", selector: (row: Product) => row.product_name || "N/A" },
        { name: "Category", selector: (row: Product) => row.category_name || "Uncategorized" },
        {
            name: "Discount %",
            selector: (row: Product) => (row.discount !== null ? `${row.discount}%` : "0%"),
        },
        { name: "Price", selector: (row: Product) => formatToRupiah(row.price) },
        { name: "Stock", selector: (row: Product) => row.stock },
        { name: "Eco Points", selector: (row: Product) => row.eco_point },
        {
            name: "Recycle %",
            selector: (row: Product) =>
                row.recycle_material !== null ? `${row.recycle_material}%` : "N/A",
        },
        {
            name: "Actions",
            cell: (row: Product) => (
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
    
    const Spinner = () => (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        </div>
    );
    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProducts = products.filter((product) => product.id !== id);
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts);
                Swal.fire("Deleted!", "Product has been deleted.", "success");
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Products</h2>

            {/* Search Bar */}
            <input
                type="text"
                placeholder="Search Product Name"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full border p-3 rounded-md mb-4"
            />

            <button
                onClick={() => openModal()}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
            >
                Add Product
            </button>

            <DataTable
                columns={columns}
                data={filteredProducts}
                pagination
                progressPending={loading}
                progressComponent={<Spinner />}
            />

            {/* Modal */}
            <ReusableModal
                isOpen={modalIsOpen}
                onClose={closeModal}
                title={editingId ? "Edit Product" : "Add Product"}
            >
                <form className="space-y-4">
                    <div>
                        <label>Product Name</label>
                        <input
                            name="product_name"
                            placeholder="Enter product name"
                            value={form.product_name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Product Description</label>
                        <textarea
                            name="product_desc"
                            placeholder="Enter product description"
                            value={form.product_desc}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Category</label>
                        <select
                            name="category_id"
                            value={form.category_id}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Price</label>
                        <input
                            name="price"
                            type="number"
                            placeholder="Enter product price"
                            value={form.price}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Discount (%)</label>
                        <input
                            name="discount"
                            type="number"
                            placeholder="Enter discount percentage"
                            value={form.discount || ""}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Stock</label>
                        <input
                            name="stock"
                            type="number"
                            placeholder="Enter stock quantity"
                            value={form.stock}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Minimum Stock</label>
                        <input
                            name="min_stock"
                            type="number"
                            placeholder="Enter minimum stock"
                            value={form.min_stock}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Eco Points</label>
                        <input
                            name="eco_point"
                            type="number"
                            placeholder="Enter eco points"
                            value={form.eco_point}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Recycle Material Percentage</label>
                        <input
                            name="recycle_material"
                            type="number"
                            placeholder="Enter recycle material percentage"
                            value={form.recycle_material}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-md"
                        />
                    </div>
                    <div>
                        <label>Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="w-full border p-3 rounded-md"
                        />
                        {uploading && <p>Uploading...</p>}
                        {form.image_url && (
                            <Image
                                src={form.image_url}
                                alt="Uploaded"
                                width={100}
                                height={100}
                                className="mt-2 rounded-md"
                            />
                        )}
                    </div>
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

export default ManageProducts;
