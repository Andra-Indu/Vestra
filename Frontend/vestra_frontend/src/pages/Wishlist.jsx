// src/pages/Wishlist.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/wishlist");
      setItems(res.data || []);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/wishlist/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>My Wishlist</h3>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className="row">
            {items.map((it) => (
              <div className="col-md-4 mb-3" key={it.id}>
                <div className="card h-100">
                  <img src={it.image} className="card-img-top" alt={it.name} style={{ objectFit: "cover", height: 200 }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{it.name}</h5>
                    <p className="card-text">₹ {it.price}</p>
                    <div className="mt-auto d-flex justify-content-between">
                      <button className="btn btn-sm btn-outline-secondary">View</button>
                      <button className="btn btn-sm btn-danger" onClick={() => removeItem(it.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}