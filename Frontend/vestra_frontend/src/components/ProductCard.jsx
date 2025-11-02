// src/components/ProductCard.jsx
import React, { useState } from "react";
import API from "../api"; // your axios instance
import { FaHeart, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const handleAddToWishlist = async () => {
    if (!token) {
      alert("Please login to add items to your wishlist");
      return;
    }
    setWishlistLoading(true);
    try {
      await API.post(
        "/wishlist/add",
        { productId: product.id, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to wishlist!");
    } catch (err) {
      console.error(err);
      alert("Error adding to wishlist");
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please login to add items to your cart");
      return;
    }
    setCartLoading(true);
    try {
      await API.post(
        "/cart/add",
        { productId: product.id, quantity: 1, email: user.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Error adding to cart");
    } finally {
      setCartLoading(false);
    }
  };

  return (
    <div className="card shadow-sm" style={{ width: "18rem", borderRadius: "12px" }}>
      <img
        src={product.imageUrl}
        className="card-img-top"
        alt={product.name}
        style={{
          height: "220px",
          objectFit: "cover",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      />
      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">₹{product.price}</p>

        <div className="d-flex justify-content-around">
          <button
            onClick={handleAddToWishlist}
            className="btn btn-outline-danger"
            disabled={wishlistLoading}
          >
            {wishlistLoading ? "..." : <FaHeart />} Wishlist
          </button>

          <button
            onClick={handleAddToCart}
            className="btn btn-outline-primary"
            disabled={cartLoading}
          >
            {cartLoading ? "..." : <FaShoppingCart />} Cart
          </button>
        </div>
      </div>
    </div>
  );
}
