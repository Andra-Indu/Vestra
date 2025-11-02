import React, { createContext, useState, useContext, useEffect } from "react";
import API from "../api";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const userEmail = "demo@user.com"; // replace later with logged-in user email
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await API.get(`/wishlist/${userEmail}`);
      setWishlist(res.data);
    } catch (err) {
      console.error("Error loading wishlist", err);
    }
  };

  const addToWishlist = async (product) => {
    try {
      await API.post("/wishlist", { 
        ...product, 
        userEmail,
        productId: product.id.toString(),
        image: product.imageUrl 
      });
      fetchWishlist();
    } catch (err) {
      console.error("Error adding to wishlist", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      await API.delete(`/wishlist/${userEmail}/${productId}`);
      fetchWishlist();
    } catch (err) {
      console.error("Error removing from wishlist", err);
    }
  };

  return (
    <StoreContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
