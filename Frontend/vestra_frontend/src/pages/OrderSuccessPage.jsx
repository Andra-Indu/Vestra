import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.product) {
      const existingOrders =
        JSON.parse(localStorage.getItem("myOrders")) || [];
      existingOrders.push(state);
      localStorage.setItem("myOrders", JSON.stringify(existingOrders));
    }
  }, [state]);

  return (
    <div className="container py-5 text-center">
      <h2 className="text-success fw-bold mb-3">🎉 Order Placed Successfully!</h2>
      <p>Your order has been placed using {state?.paymentMethod}.</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate("/orders")}>
        View My Orders
      </button>
    </div>
  );
}
