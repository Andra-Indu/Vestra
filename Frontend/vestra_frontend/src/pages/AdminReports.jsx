import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; // ✅ axios instance pointing to backend (e.g., http://localhost:8080/api)

export default function AdminReports() {
  const [revenue, setRevenue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch stats + orders on mount
  useEffect(() => {
    fetchRevenueAndOrders();
  }, []);

  const fetchRevenueAndOrders = async () => {
    try {
      // ✅ Fetch total revenue from backend (AdminStatsController)
      const statsRes = await API.get("/admin/stats");
      setRevenue(statsRes.data.revenue || 0);

      // ✅ Fetch all orders for report view
      const ordersRes = await API.get("/orders/all");
      setOrders(ordersRes.data);
    } catch (error) {
      console.error("❌ Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4 text-center">💰 Reports & Revenue Summary</h3>

      <div className="card p-4 shadow-sm border-0">
        {loading ? (
          <p>Loading reports...</p>
        ) : (
          <>
            {/* ✅ Revenue Summary */}
            <div className="text-center mb-4">
              <h4 className="text-success">
                Total Revenue: ₹{revenue.toFixed(2)}
              </h4>
              <p className="text-muted">
                (Based on all completed orders)
              </p>
            </div>

            {/* ✅ Orders Table */}
            <h5 className="mb-3">Order Details</h5>
            {orders.length === 0 ? (
              <p className="text-muted text-center">No orders found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered table-striped align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>User Email</th>
                      <th>Payment Method</th>
                      <th>Status</th>
                      <th>Total Amount</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => (
                      <tr key={order.id}>
                        <td>{index + 1}</td>
                        <td>{order.userEmail}</td>
                        <td>{order.paymentMethod}</td>
                        <td>
                          <span
                            className={`badge ${
                              order.status === "Completed"
                                ? "bg-success"
                                : order.status === "Pending"
                                ? "bg-warning text-dark"
                                : "bg-secondary"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>₹{order.totalAmount?.toFixed(2) || "0.00"}</td>
                        <td>
                          {order.createdAt
                            ? new Date(order.createdAt).toLocaleString()
                            : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      <div className="text-center mt-4">
        <Link to="/adminDashboard" className="btn btn-outline-primary">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
