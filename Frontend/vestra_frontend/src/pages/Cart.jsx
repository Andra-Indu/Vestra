// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import API from "../api";
import Navbar from "../components/Navbar";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await API.get("/cart");
      setItems(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      setItems((prev) => prev.filter((i) => i.id !== id));
      window.dispatchEvent(new Event("storage"));
    } catch (err) {
      console.error(err);
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h3>My Cart</h3>
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="card mb-3 shadow-sm p-3 d-flex flex-row align-items-center"
                >
                  <img
                    src={it.image}
                    alt={it.name}
                    style={{
                      width: 100,
                      height: 100,
                      objectFit: "cover",
                      marginRight: 20,
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h5>{it.name}</h5>
                    <p>₹ {it.price}</p>
                    <div className="d-flex align-items-center gap-3">
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={async (e) => {
                          const quantity = parseInt(e.target.value);
                          await API.put(`/cart/${it.id}`, { quantity });
                          load();
                        }}
                        style={{ width: 60 }}
                      />
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeItem(it.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="col-md-4">
              <div className="card p-3 shadow-sm">
                <h5>Total Price: ₹ {totalPrice.toFixed(2)}</h5>
                <button className="btn btn-primary w-100 mt-2">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
