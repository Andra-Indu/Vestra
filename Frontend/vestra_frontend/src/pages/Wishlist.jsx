import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../api";
import { motion } from "framer-motion";
import { FaTrash } from "react-icons/fa";

export default function Wishlist() {
  const location = useLocation();
  const [wishlist, setWishlist] = useState(location.state?.wishlist || []);
  const userEmail = localStorage.getItem("email");

  // ✅ Fetch wishlist if not passed from UserDashboard
  useEffect(() => {
    if (!location.state?.wishlist && userEmail) {
      fetchWishlist();
    }
  }, [userEmail]);

  const fetchWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/${userEmail}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    }
  };

  // ✅ Remove item from wishlist
  const removeItem = async (productId) => {
  try {
    await API.delete(`/wishlist/${userEmail}/${productId}`);
    setWishlist((prev) => prev.filter((item) => item.productId !== productId));
  } catch (err) {
    console.error("Error removing item:", err);
  }
};
  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4 text-center">❤️ My Wishlist</h3>

      {wishlist.length === 0 ? (
        <p className="text-center text-muted mt-5">
          Your wishlist is empty. Start adding products you love! 💖
        </p>
      ) : (
        <div className="row g-4">
          {wishlist.map((item) => (
            <motion.div
              key={item.productId}
              className="col-6 col-sm-4 col-md-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div
                className="card border-0 shadow-sm h-100 position-relative"
                style={{
                  borderRadius: "14px",
                  background: "rgba(255,255,255,0.9)",
                  overflow: "hidden",
                }}
              >
                <div
                  className="position-absolute top-0 end-0 p-2"
                  style={{ cursor: "pointer", zIndex: 10 }}
                  onClick={() => removeItem(item.productId)}
                >
                  <FaTrash color="red" size={18} />
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
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>

                <div className="card-body text-center p-3 d-flex flex-column">
                  <h6 className="fw-bold mb-1">{item.name}</h6>
                  <p className="text-success fw-bold mb-2">₹{item.price}</p>
                  {/* <p className="text-muted small flex-grow-1">{item.description}</p> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
