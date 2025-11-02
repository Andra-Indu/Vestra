import React, { useEffect, useState } from "react";
import API, { addWishList } from "../api";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState("");

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("email");

  useEffect(() => {
    fetchProducts();
    fetchWishlist();
    fetchCart();
  }, []);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error loading products:", err);
    }
  };

  // ✅ Fetch wishlist
  const fetchWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/${userEmail}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // ✅ Fetch cart
  const fetchCart = async () => {
    try {
      const res = await API.get(`/cart/${userEmail}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  };

  // ✅ Add/remove product from wishlist
  const toggleWishlist = async (product) => {
    const exists = wishlist.find(
      (item) => item.productId === product.id.toString()
    );
    try {
      if (exists) {
        await API.delete(`/api/wishlist/remove/${userEmail}/${product.id}`);
        setWishlist((prev) =>
          prev.filter((item) => item.productId !== product.id.toString())
        );
      } else {
        const newItem = {
          userEmail,
          productId: product.id.toString(),
          name: product.name,
          image: product.imageUrl,
          price: product.price,
          description: product.description,
        };
        await addWishList(newItem);
        setWishlist((prev) => [...prev, newItem]);
      }
    } catch (err) {
      console.error("Error updating wishlist:", err);
    }
  };

  // ✅ Add/remove product from cart
  const toggleCart = async (product) => {
    const exists = cart.find(
      (item) => item.productId === product.id.toString()
    );
    try {
      if (exists) {
        await API.delete(`/cart/remove/${userEmail}/${product.id}`);
        setCart((prev) =>
          prev.filter((item) => item.productId !== product.id.toString())
        );
      } else {
        const newCartItem = {
          userEmail,
          productId: product.id.toString(),
          name: product.name,
          image: product.imageUrl,
          price: product.price,
          quantity: 1,
        };
        await API.post("/cart/add", newCartItem);
        setCart((prev) => [...prev, newCartItem]);
      }
    } catch (err) {
      console.error("Error updating cart:", err);
    }
  };

  // ✅ Navigation helpers
  const goToWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/${userEmail}`);
      navigate("/wishlist", { state: { wishlist: res.data } });
    } catch (err) {
      console.error("Error loading wishlist:", err);
    }
  };

  const goToCart = async () => {
    try {
      const res = await API.get(`/cart/${userEmail}`);
      navigate("/cart", { state: { cart: res.data } });
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  // ✅ Filtering
  const filteredProducts = products.filter(
    (p) =>
      !selectedCategory ||
      p.category.toLowerCase() === selectedCategory.toLowerCase()
  );

  // ⭐ Star rendering
  const renderStars = (rating) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar
          key={i}
          color={i < rating ? "gold" : "lightgray"}
          className="me-1"
        />
      ));

  // 🔽 Animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  return (
    <div
      className={`min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ transition: "all 0.4s ease" }}
    >
      {/* 🔹 Navbar */}
      <nav
        className={`navbar navbar-expand-lg px-4 py-3 shadow-sm ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-white"
        }`}
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <h3
            className="fw-bold mb-0"
            style={{
              background: "linear-gradient(45deg,#ff416c,#ff4b2b)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              cursor: "pointer",
            }}
            onClick={() => navigate("/dashboard")}
          >
            🛍️ VESTRA Fashion
          </h3>

          <div className="d-flex align-items-center position-relative">
            <button className="btn btn-outline-danger me-2" onClick={goToWishlist}>
              ❤️ Wishlist ({wishlist.length})
            </button>
            <button className="btn btn-outline-primary me-2" onClick={goToCart}>
              🛒 Cart ({cart.length})
            </button>
            <button
              className={`btn ${darkMode ? "btn-light" : "btn-dark"} me-3`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <div className="position-relative">
              <FaUserCircle
                size={32}
                style={{ cursor: "pointer" }}
                onClick={() => setShowMenu(!showMenu)}
              />
              <AnimatePresence>
                {showMenu && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`dropdown-menu dropdown-menu-end show mt-2 shadow border-0 ${
                      darkMode ? "bg-dark text-light" : "bg-white text-dark"
                    }`}
                    style={{
                      position: "absolute",
                      right: 0,
                      borderRadius: "10px",
                      width: "220px",
                    }}
                  >
                    {[
                      { label: "👤 My Profile", path: "/profile" },
                      { label: "📦 My Orders", path: "/orders" },
                      { label: "🛒 My Cart", path: "/cart" },
                      { label: "❤️ My Wishlist", path: "/wishlist" },
                      { label: " 🔔 Notifications", path: "/notifications" },
                      { label: "⚙️ Settings", path: "/settings" },
                      { label: "💰 Wallet", path: "/wallet" },
                      { label: "🚪 Logout", path: "/" },
                    ].map((item, i) => (
                      <button
                        key={i}
                        className={`dropdown-item ${
                          darkMode ? "text-light" : "text-dark"
                        }`}
                        onClick={() => {
                          setShowMenu(false);
                          navigate(item.path);
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* 🔹 Category Bar */}
      <div
        className={`shadow-sm py-2 ${
          darkMode ? "bg-secondary text-light" : "bg-white text-dark"
        }`}
        style={{
          position: "sticky",
          top: 70,
          zIndex: 25,
          borderBottom: darkMode
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid #ddd",
        }}
      >
        <div className="container d-flex justify-content-center flex-wrap gap-4 fw-semibold">
          {["Men", "Women", "Kids"].map(
            (cat) => (
              <span
                key={cat}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCategory(cat.toLowerCase())}
              >
                {cat}
              </span>
            )
          )}
        </div>
      </div>

      {/* 🔹 Product Cards */}
      <div className="container py-4">
        {filteredProducts.length === 0 ? (
          <p className="text-muted text-center">No products found.</p>
        ) : (
          <div className="row g-4">
            {filteredProducts.map((product) => {
              const inWishlist = wishlist.some(
                (w) => w.productId === product.id.toString()
              );
              const inCart = cart.some(
                (c) => c.productId === product.id.toString()
              );

              return (
                <motion.div
                  key={product.id}
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
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product);
                      }}
                    >
                      {inWishlist ? <FaHeart color="red" /> : <FaRegHeart />}
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
                        src={product.imageUrl}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
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

                      <h6 className="fw-bold" style={{ color: "#00b894" }}>
                        ₹{product.price}
                      </h6>
                      <button
                        className={`btn w-100 btn-sm mt-2 ${
                          inCart ? "btn-danger" : "btn-primary"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleCart(product);
                        }}
                      >
                        {inCart ? "Remove from Cart" : "Add to Cart"}{" "}
                        <FaShoppingCart className="ms-1" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
