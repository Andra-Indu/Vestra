// import React, { useEffect, useState } from "react";

// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("myOrders")) || [];
//     setOrders(stored);
//   }, []);

//   return (
//     <div className="container py-5">
//       <h2 className="fw-bold text-primary mb-4 text-center">📦 My Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-center text-muted">No orders placed yet.</p>
//       ) : (
//         <div className="row g-4">
//           {orders.map((order, idx) => (
//             <div key={idx} className="col-md-4">
//               <div className="card shadow-sm border-0 rounded-4 h-100">
//                 <img
//                   src={order.product.imageUrl}
//                   alt={order.product.name}
//                   className="card-img-top rounded-top-4"
//                   style={{ height: "200px", objectFit: "cover" }}
//                 />
//                 <div className="card-body">
//                   <h5 className="fw-bold">{order.product.name}</h5>
//                   <p className="text-muted mb-1">
//                     Size: <b>{order.selectedSize}</b>
//                   </p>
//                   <p className="mb-1">Payment: {order.paymentMethod}</p>
//                   <h6 className="fw-bold text-success mb-0">
//                     ₹{order.product.price}
//                   </h6>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { getUserOrders } from "../api"; // ✅ Import API function

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem("email"); // ✅ identify logged-in user

  useEffect(() => {
    if (!userEmail) return;

    // 🟩 Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const res = await getUserOrders(userEmail);
        setOrders(res.data);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <h4>Loading your orders...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4 text-center">📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders placed yet.</p>
      ) : (
        <div className="row g-4">
          {orders.map((order) => (
            <div key={order.id} className="col-md-4">
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">Order #{order.id}</h5>
                  <p className="text-muted mb-1">
                    <b>Payment:</b> {order.paymentMethod}
                  </p>
                  <p className="text-muted mb-1">
                    <b>Status:</b> {order.status}
                  </p>
                  <h6 className="fw-bold text-success mb-3">
                    Total: ₹{order.amount}
                  </h6>

                  <ul className="list-group small">
                    {order.orderItems?.map((item, i) => (
                      <li key={i} className="list-group-item d-flex justify-content-between">
                        <span>
                          {item.productName} x {item.quantity}
                        </span>
                        <span>₹{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
