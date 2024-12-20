import React, { useState } from "react";
import Swal from "sweetalert2";
import { API_MANAGE_SELLER_PRODUCT } from "@/src/constants/api";
import { Category, Product } from "./types";


interface Props {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: () => void;
}

const ProductModal: React.FC<Props> = ({ product, categories, onClose, onSave }) => {
  const [form, setForm] = useState<Product>(
    product || {
      id: 0,
      seller_id: 1,
      product_name: "",
      price: 0,
      discount: 0,
      product_desc: "",
      stock: 0,
      min_stock: 0,
      is_out_of_stock: false,
      category_id: 0,
      eco_point: 0,
      recycle_material_percentage: 0,
      image_url: null,
      category_name: null,
    }
  );

  const handleSubmit = async () => {
    if (!form.product_name || !form.price || !form.category_id) {
      Swal.fire("Error", "Please fill out all required fields", "error");
      return;
    }

    try {
      const url = form.id
        ? `${API_MANAGE_SELLER_PRODUCT}/${form.id}`
        : `${API_MANAGE_SELLER_PRODUCT}/add-product`;
      const method = form.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        Swal.fire("Success", "Product saved successfully!", "success");
        onSave();
        onClose();
      } else {
        Swal.fire("Error", data.message || "Failed to save product", "error");
      }
    } catch {
      Swal.fire("Error", "Failed to save product", "error");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{form.id ? "Edit Product" : "Add Product"}</h2>
        <div>
          <label>Product Name</label>
          <input
            value={form.product_name}
            onChange={(e) => setForm({ ...form, product_name: e.target.value })}
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={form.category_id}
            onChange={(e) =>
              setForm({ ...form, category_id: parseInt(e.target.value) })
            }
          >
            <option value="">Select</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.category_name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ProductModal;
