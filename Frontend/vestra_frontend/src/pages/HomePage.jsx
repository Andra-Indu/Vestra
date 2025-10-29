import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import API from "../api";
import heroImage from "../assets/hero-placeholder.jpg"; // ✅ make sure image exists

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // ✅ Fetch all products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products/all");
      setProducts(res.data);
      setFiltered(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  // ✅ Handle category filtering
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") setFiltered(products);
    else setFiltered(products.filter((p) => p.category === category));
  };

  return (
    <>
      {/* ✅ Navbar */}
      <Navbar />

      {/* ✅ Hero Section */}
      <div
        className="home-hero d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          minHeight: "100vh",
          width: "100%",
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          color: "white",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1,
          }}
        ></div>

        <div style={{ zIndex: 2 }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Welcome to{" "}
            <span style={{ color: "#f8d210" }}>Vestra Clothing</span>
          </h1>

          <p
            style={{
              fontSize: "1.3rem",
              maxWidth: "650px",
              margin: "0 auto 30px",
              color: "#f1f1f1",
            }}
          >
            Explore our latest collections — elegant, stylish, and made for you.
          </p>

          <button
            className="btn btn-light px-4 py-2"
            style={{
              borderRadius: "30px",
              fontWeight: "600",
              color: "#222",
            }}
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* ✅ Category Filter Buttons */}
      <div className="container text-center mt-5">
        <h3 className="mb-4" style={{ fontWeight: "600" }}>
          Browse by Category
        </h3>
        <div className="d-flex justify-content-center flex-wrap gap-3 mb-4">
          {["All", "Men", "Women", "Kids"].map((cat) => (
            <button
              key={cat}
              className={`btn ${
                selectedCategory === cat
                  ? "btn-dark"
                  : "btn-outline-dark"
              } px-4 py-2`}
              onClick={() => handleCategoryClick(cat)}
              style={{ borderRadius: "25px", fontWeight: "500" }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="container mb-5">
        {filtered.length === 0 ? (
          <p className="text-center text-muted">
            No products available for {selectedCategory}.
          </p>
        ) : (
          <div className="row">
            {filtered.map((product) => (
              <div className="col-md-3 col-sm-6 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}