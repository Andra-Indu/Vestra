import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; // ✅ Make sure API is correctly configured (axios instance)

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("❌ Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">📦 Manage Orders</h2>
          <Link
            to="/adminDashboard"
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* ✅ Orders Table */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg animate-pulse">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">User Email</th>
                  <th className="py-3 px-4 text-left">Payment Method</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Total Amount</th>
                  <th className="py-3 px-4 text-left">Created At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {order.id}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{order.userEmail}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {order.paymentMethod || "-"}
                    </td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        order.status === "Completed"
                          ? "text-green-600"
                          : order.status === "Pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.status || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-700">
                      ₹{order.totalAmount ? order.totalAmount.toFixed(2) : "0.00"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
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
      </div>
    </div>
  );
}
