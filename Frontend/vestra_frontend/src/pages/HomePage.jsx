import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegHeart, FaHeart, FaShoppingCart } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const banners = [
    "https://images.unsplash.com/photo-1520975698519-59c39fe8d1fe?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1600&q=80",
  ];
  const [currentBanner, setCurrentBanner] = useState(0);
  const [hovering, setHovering] = useState(false);
  const userEmail = localStorage.getItem("email") || "guest@vestra.com";

  useEffect(() => {
    fetchProducts();
    const autoSlide = setInterval(() => {
      if (!hovering) {
        setCurrentBanner((prev) => (prev + 1) % banners.length);
      }
    }, 4000);
    return () => clearInterval(autoSlide);
  }, [hovering]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data);
      setFiltered(res.data);
      setError("");
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Unable to fetch products. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFiltered(products);
    else
      setFiltered(
        products.filter(
          (p) => p.category?.toLowerCase() === category.toLowerCase()
        )
      );
  };

  const toggleWishlist = (product) => {
    const exists = wishlist.find((p) => p.id === product.id);
    if (exists) setWishlist(wishlist.filter((p) => p.id !== product.id));
    else setWishlist([...wishlist, product]);
  };

  const toggleCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) setCart(cart.filter((item) => item.id !== product.id));
    else setCart([...cart, product]);
  };

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

  return (
    <>
      <Navbar />

      {/* Hero Banner Section */}
      <div
        className="hero-container"
        style={{
          position: "relative",
          overflow: "hidden",
          height: "70vh",
          borderBottom: "5px solid #f8d210",
          perspective: "1000px",               // 3D perspective for background
          transformStyle: "preserve-3d",
        }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBanner}
            initial={{ opacity: 0, scale: 1.05, rotateY: -3 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotateY: 3 }}
            transition={{ duration: 1.2 }}
            style={{
              backgroundImage: `url(${banners[currentBanner]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "100%",
              width: "100%",
              position: "absolute",
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          />
        </AnimatePresence>

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.55)",
            zIndex: 1,
            transform: "translateZ(0px)",       // ensure 3D layering
          }}
        />

        {/* Hero Text */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: "relative",
            zIndex: 2,
            color: "white",
            top: "35%",
            textAlign: "center",
            transform: "translateZ(50px)",       // push text slightly forward in 3D
          }}
        >
          <h1 className="fw-bold mb-3" style={{ fontSize: "2.8rem" }}>
            Discover <span style={{ color: "#f8d210" }}>Your Style</span>
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              color: "#f1f1f1",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Shop trendy apparel and fresh looks — every season, every story.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="btn btn-light px-4 py-2 mt-4 fw-semibold"
            style={{
              borderRadius: "30px",
              transform: "translateZ(60px)",
            }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </motion.button>
        </motion.div>

        {/* Arrows (visible only on hover) */}
        {hovering && (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="arrow-left"
              style={{
                position: "absolute",
                left: "2%",
                top: "50%",
                transform: "translateY(-50%) translateZ(70px)",
                color: "white",
                fontSize: "2rem",
                zIndex: 3,
                cursor: "pointer",
              }}
              onClick={() =>
                setCurrentBanner((prev) =>
                  prev === 0 ? banners.length - 1 : prev - 1
                )
              }
            >
              <IoIosArrowBack />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="arrow-right"
              style={{
                position: "absolute",
                right: "2%",
                top: "50%",
                transform: "translateY(-50%) translateZ(70px)",
                color: "white",
                fontSize: "2rem",
                zIndex: 3,
                cursor: "pointer",
              }}
              onClick={() => setCurrentBanner((prev) => (prev + 1) % banners.length)}
            >
              <IoIosArrowForward />
            </motion.div>
          </>
        )}
      </div>

      {/* Category Filter */}
      <div className="container text-center mt-5">
        <h3 className="mb-4 fw-semibold">Browse by Category</h3>
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          {["All", "Men", "Women", "Kids"].map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategory === cat ? "btn-dark" : "btn-outline-dark"
              } px-4 py-2`}
              onClick={() => handleCategoryClick(cat)}
              style={{ borderRadius: "25px", fontWeight: "500", transform: "translateZ(20px)" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mb-5">
        {loading ? (
          <p className="text-center text-secondary">Loading products...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted">No products found.</p>
        ) : (
          <div className="row g-4">
            {filtered.map((product) => {
              const inWishlist = wishlist.some((p) => p.id === product.id);
              const inCart = cart.some((c) => c.id === product.id);

              return (
                <motion.div
                  key={product.id}
                  className="col-6 col-sm-4 col-md-3"
                  whileHover={{ scale: 1.06, rotateY: 1, rotateX: -1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <div
                    className="card border-0 shadow-sm position-relative h-100"
                    style={{
                      borderRadius: "14px",
                      cursor: "pointer",
                      overflow: "hidden",
                      perspective: "800px",              // 3D card container perspective
                      transformStyle: "preserve-3d",
                    }}
                    onClick={() =>
                      navigate(`/product/${product.id}`, { state: { product } })
                    }
                  >
                    <div
                      className="card-inner"
                      style={{
                        transformStyle: "preserve-3d",
                        transition: "transform 0.4s",
                      }}
                    >
                      {/* Wishlist */}
                      <div
                        className="position-absolute top-0 end-0 p-2"
                        style={{ zIndex: 2, transform: "translateZ(40px)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                      >
                        {inWishlist ? <FaHeart color="red" /> : <FaRegHeart color="gray" />}
                      </div>

                      {/* Image */}
                      <div
                        style={{
                          height: "180px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#f9f9f9",
                          transform: "translateZ(60px)",     // push image forward for 3D effect
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

                      {/* Info */}
                      <div className="card-body text-center" style={{ transform: "translateZ(40px)" }}>
                        <h6 className="fw-bold mb-1">{product.name}</h6>
                        <p className="text-muted small mb-1">{product.category}</p>
                        <div className="d-flex justify-content-center align-items-center mb-2">
                          {renderStars(product.rating || 4)}
                          <small className="ms-1 text-muted">
                            ({product.reviewsCount || 10})
                          </small>
                        </div>
                        <h6 className="fw-bold text-success mb-2">
                          ₹{product.price}
                        </h6>
                        <button
                          className={`btn btn-sm w-100 ${
                            inCart ? "btn-danger" : "btn-primary"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCart(product);
                          }}
                          style={{ transform: "translateZ(30px)" }}
                        >
                          {inCart ? "Remove from Cart" : "Add to Cart"}{" "}
                          <FaShoppingCart className="ms-1" />
                        </button>
                      </div>

                      {/* Add subtle hover rotation */}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
