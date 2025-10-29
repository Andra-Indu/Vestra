// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import API from "../api";

export default function Navbar() {
  const [wishCount, setWishCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  const fetchCounts = async () => {
    try {
      const [wishRes, cartRes] = await Promise.all([
        API.get("/wishlist"),
        API.get("/cart"),
      ]);
      setWishCount(wishRes.data.length || 0);
      setCartCount(cartRes.data.length || 0);
    } catch {
      setWishCount(0);
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCounts();
    window.addEventListener("storage", fetchCounts);
    return () => window.removeEventListener("storage", fetchCounts);
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4"
      style={{
        height: "70px",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Vestra Logo"
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              marginRight: 10,
            }}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: 700 }}>Vestra</span>
        </Link>

        <div className="d-flex align-items-center gap-3">
          <Link
            to="/login"
            className="btn btn-outline-dark btn-sm px-4"
            style={{ borderRadius: 20 }}
          >
            Login
          </Link>

          <Link to="/wishlist" style={{ color: "#000", position: "relative" }}>
            <FaHeart size={20} />
            {wishCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#dc3545",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {wishCount}
              </span>
            )}
          </Link>

          <Link to="/cart" style={{ color: "#000", position: "relative" }}>
            <FaShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#007bff",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "12px",
                }}
              >
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
