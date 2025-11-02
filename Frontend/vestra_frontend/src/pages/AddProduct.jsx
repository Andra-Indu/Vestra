import React, { useState } from "react";
import API from "../api";

export default function AddProduct() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/products/add", form);
      alert("Product added successfully!");
      setForm({ name: "", description: "", price: "", imageUrl: "", category: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 600 }}>
      <h3 className="mb-3">Add Product</h3>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          className="form-control mb-3"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          required
        />
        <input
          className="form-control mb-3"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <button className="btn btn-primary w-100" type="submit">
          Add Product
        </button>
      </form>
    </div>
  );
}
