import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import API from "../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "Men",
    imageUrl: "",
    description: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);

  // ✅ Fetch all products on load
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct.id}`, product);
      } else {
        await API.post("/products", product);
      }
      fetchProducts();
      setProduct({
        name: "",
        price: "",
        category: "Men",
        imageUrl: "",
        description: "",
      });
      setEditingProduct(null);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setEditingProduct(prod);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <div
      className="container mt-5"
      style={{
        maxWidth: "1100px",
        background: "linear-gradient(180deg, #f9fafc 0%, #f0f4f9 100%)",
        borderRadius: "15px",
        padding: "30px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#2c3e50",
          marginBottom: "25px",
        }}
      >
        Manage Products
      </h3>

      {/* Product Form */}
      <div
        className="card p-4"
        style={{
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          border: "none",
          marginBottom: "30px",
        }}
      >
        <h5
          style={{
            fontWeight: "600",
            color: "#34495e",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-6 mb-3">
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="form-select"
              >
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <input
                type="text"
                name="imageUrl"
                value={product.imageUrl}
                onChange={handleChange}
                placeholder="Paste Image URL"
                className="form-control"
              />
            </div>

            <div className="col-12 mb-3">
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Product Description"
                className="form-control"
                rows={2}
              />
            </div>
          </div>

          {product.imageUrl && (
            <div className="text-center mb-3">
              <img
                src={product.imageUrl}
                alt="preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  border: "2px solid #e0e0e0",
                }}
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-success"
              style={{
                background: "linear-gradient(135deg, #43a047, #2e7d32)",
                border: "none",
                borderRadius: "8px",
              }}
            >
              <FaPlus className="me-1" />
              {editingProduct ? "Update Product" : "Add Product"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              style={{
                borderRadius: "8px",
              }}
              onClick={() => {
                setProduct({
                  name: "",
                  price: "",
                  category: "Men",
                  imageUrl: "",
                  description: "",
                });
                setEditingProduct(null);
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Product List */}
      <div
        className="card p-4"
        style={{
          borderRadius: "12px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
          border: "none",
        }}
      >
        <h5
          style={{
            fontWeight: "600",
            color: "#34495e",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "8px",
            marginBottom: "20px",
          }}
        >
          📦 Product List
        </h5>

        {products.length === 0 ? (
          <p className="text-muted text-center">No products found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped align-middle">
              <thead
                style={{
                  background: "#1976d2",
                  color: "white",
                }}
              >
                <tr>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </td>
                    <td style={{ fontWeight: "500" }}>{prod.name}</td>
                    <td>{prod.category}</td>
                    <td>₹{prod.price}</td>
                    <td style={{ maxWidth: "250px" }}>{prod.description}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(prod)}
                        className="btn btn-sm btn-warning me-2"
                        style={{
                          borderRadius: "6px",
                          fontWeight: "500",
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(prod.id)}
                        className="btn btn-sm btn-danger"
                        style={{
                          borderRadius: "6px",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="text-center mt-4">
        <Link
          to="/adminDashboard"
          className="btn btn-outline-primary"
          style={{
            borderRadius: "8px",
            padding: "8px 20px",
          }}
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
