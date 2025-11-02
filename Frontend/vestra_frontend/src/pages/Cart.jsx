import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTrash, FaStar } from "react-icons/fa";
import API from "../api";

export default function Cart() {
  const { state } = useLocation();
  const [cart, setCart] = useState(state?.cart || []);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get(`/cart/${userEmail}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await API.delete(`/cart/remove/${userEmail}/${productId}`);
      setCart((prev) => prev.filter((item) => item.productId !== productId.toString()));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const goToWishlist = () => navigate("/wishlist");
  const goToHome = () => navigate("/userDashboard");

  const goToPayment = () => {
    navigate("/payment", { state: { cart, totalPrice } });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const renderStars = (rating) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar key={i} color={i < rating ? "gold" : "lightgray"} className="me-1" />
      ));

  return (
    <div
      className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{ transition: "all 0.4s ease" }}
    >
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg px-4 py-3 shadow-sm ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
        style={{ position: "sticky", top: 0, zIndex: 10 }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h3
            className="fw-bold mb-0"
            style={{
              background: "linear-gradient(45deg,#ff416c,#ff4b2b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            VESTRA Fashion
          </h3>

          <div>
            <button className="btn btn-outline-danger me-2" onClick={goToWishlist}>
              ❤️ Wishlist
            </button>
            <button className="btn btn-outline-secondary me-2" onClick={goToHome}>
              🏠 Home
            </button>
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Section */}
      <div className="container py-4">
        <h4 className="fw-bold mb-4">🛒 Your Cart</h4>

        {cart.length === 0 ? (
          <p className="text-muted text-center mt-5">Your cart is empty 🛍️</p>
        ) : (
          <>
            <div className="row g-4">
              {cart.map((product) => (
                <motion.div
                  key={product.productId}
                  className="col-6 col-sm-4 col-md-3"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div
                    className="card border-0 shadow-sm h-100 position-relative"
                    style={{
                      borderRadius: "14px",
                      overflow: "hidden",
                      background: darkMode
                        ? "rgba(255,255,255,0.08)"
                        : "rgba(255,255,255,0.9)",
                    }}
                  >
                    <div
                      className="position-absolute top-0 end-0 p-2"
                      onClick={() => removeFromCart(product.productId)}
                      style={{ cursor: "pointer" }}
                    >
                      <FaTrash color="red" />
                    </div>

                    <div
                      style={{
                        height: "180px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f8f8f8",
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      />
                    </div>

                    <div className="card-body text-center p-3 d-flex flex-column">
                      <h6 className="fw-bold mb-1">{product.name}</h6>
                      <small className="text-muted mb-2">{product.category}</small>
                      <div className="d-flex justify-content-center align-items-center mb-2">
                        {renderStars(product.rating || 4)}
                        <small className="ms-2 text-muted">
                          ({product.reviewsCount || 20})
                        </small>
                      </div>
                      <h6 className="fw-bold mb-2" style={{ color: "#00b894" }}>
                        ₹{product.price}
                      </h6>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 text-end">
              <h5 className="fw-bold">
                Total: <span style={{ color: "#00b894" }}>₹{totalPrice}</span>
              </h5>
              <button className="btn btn-success mt-3 px-4 py-2" onClick={goToPayment}>
                Proceed to Checkout 💳
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
