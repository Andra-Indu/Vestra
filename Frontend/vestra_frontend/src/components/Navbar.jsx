import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import API from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const [wishCount, setWishCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchCounts();
    window.addEventListener("storage", fetchCounts);
    return () => {
      window.removeEventListener("storage", fetchCounts);
    };
  }, []);

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

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const closeDropdown = () => setDropdownOpen(false);

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top shadow-sm"
      style={{
        backgroundColor: "#ffffff",
        height: "70px",
        transition: "all 0.3s ease",
        zIndex: 1100,
        borderBottom: "1px solid #eee",
      }}
    >
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center text-dark text-decoration-none"
        >
          <img
            src={logo}
            alt="Vestra Logo"
            style={{
              width: 45,
              height: 45,
              objectFit: "cover",
              marginRight: 8,
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: "700",
              color: "#0d6efd",
              transition: "color 0.3s ease",
            }}
          >
            VESTRA
          </span>
        </Link>

        {/* Icons Section */}
        <div className="d-flex align-items-center gap-3 position-relative">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            style={{
              color: "#000",
              position: "relative",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaHeart size={22} />
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

          {/* Cart */}
          <Link
            to="/cart"
            style={{
              color: "#000",
              position: "relative",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <FaShoppingCart size={22} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#0d6efd",
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

          {/* Profile Dropdown */}
          <div
            className="dropdown"
            onMouseEnter={toggleDropdown}
            onMouseLeave={closeDropdown}
            style={{ position: "relative" }}
          >
            <FaUserCircle
              size={26}
              style={{
                color: "#000",
                cursor: "pointer",
                transition: "transform 0.3s ease, color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            {dropdownOpen && (
              <div
                className="dropdown-menu show text-center"
                style={{
                  right: 0,
                  left: "auto",
                  top: "110%",
                  borderRadius: "10px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  backgroundColor: "#fff",
                  minWidth: "150px",
                  animation: "fadeIn 0.25s ease-in-out",
                }}
              >
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/login")}
                  style={{
                    transition: "background 0.3s ease",
                  }}
                >
                  Login
                </button>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/register")}
                  style={{
                    transition: "background 0.3s ease",
                  }}
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Smooth dropdown animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}
