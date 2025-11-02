import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  const [selectedSize, setSelectedSize] = useState("");
  const [inWishlist, setInWishlist] = useState(false);
  const [inCart, setInCart] = useState(false);

  // If product data missing
  if (!product) {
    return (
      <div className="text-center py-5">
        <h4>Product not found!</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

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

  // Proceed to Checkout → Payment Page
  const handleCheckout = () => {
    if (!selectedSize) {
      alert("⚠️ Please select a size before proceeding to checkout.");
      return;
    }
    navigate("/payment", { state: { product, selectedSize } });
  };

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        {/* Product Imagea */}
        <div className="col-md-5 text-center">
          <motion.img
            src={product.imageUrl}
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "400px", objectFit: "contain" }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Product Details */}
        <div className="col-md-7 mt-4 mt-md-0">
          <h3 className="fw-bold">{product.name}</h3>
          <p className="text-muted">{product.category}</p>

          <div className="d-flex align-items-center mb-3">
            {renderStars(product.rating || 4)}
            <small className="ms-2 text-muted">
              ({product.reviewsCount || 20} reviews)
            </small>
          </div>

          <p>{product.description || "No description available."}</p>

          <h4 className="text-success fw-bold mb-3">₹{product.price}</h4>

          {/* Size Selection */}
          <div className="mb-4">
            <h6>Select Size:</h6>
            {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
              <button
                key={size}
                className={`btn btn-outline-dark me-2 mb-2 ${
                  selectedSize === size ? "active" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Wishlist & Cart */}
          <div className="d-flex align-items-center mb-3">
            <button
              className={`btn me-3 ${
                inWishlist ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => setInWishlist(!inWishlist)}
            >
              {inWishlist ? <FaHeart className="me-1" /> : <FaRegHeart className="me-1" />}
              {inWishlist ? "In Wishlist" : "Add to Wishlist"}
            </button>

            <button
              className={`btn ${
                inCart ? "btn-danger" : "btn-outline-primary"
              }`}
              onClick={() => setInCart(!inCart)}
            >
              {inCart ? (
                <>
                  Remove <FaShoppingCart className="ms-1" />
                </>
              ) : (
                <>
                  Add to Cart <FaShoppingCart className="ms-1" />
                </>
              )}
            </button>
          </div>

          {/* Proceed to Checkout */}
          <button
            className="btn btn-success w-50 mt-2"
            onClick={handleCheckout}
          >
            🛒 Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
