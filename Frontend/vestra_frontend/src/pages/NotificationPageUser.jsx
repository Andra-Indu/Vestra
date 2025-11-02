import React from "react";
import Footer from "../components/Footer";

export default function NotificationsPageUser() {
const notifications = [
{
id: 1,
title: "🎉 Mega Sale is Live!",
message:
"Flat 50% OFF on all new arrivals. Limited time only — shop now before it ends!",
time: "2 hours ago",
},
{
id: 2,
title: "🚚 Your Order Has Been Shipped",
message:
"Your Vestra order #10234 is on its way. Track your package in 'My Orders'.",
time: "1 day ago",
},
{
id: 3,
title: "💸 Wallet Cashback Added",
message:
"You’ve received ₹250 Vestra Cashback from your recent purchase.",
time: "3 days ago",
},
];

return (
<div
className="d-flex flex-column min-vh-100"
style={{ backgroundColor: "#fafafa" }}
>
  
<div className="container py-5">
<div className="d-flex justify-content-between align-items-center mb-4">
<h2 className="fw-bold text-primary mb-0">🔔 Notifications</h2>

      {/* Animated button */}
      <button
        className="btn px-4 py-2 fw-semibold"
        style={{
          borderRadius: "25px",
          border: "2px solid #0d6efd",
          color: "#0d6efd",
          backgroundColor: "white",
          boxShadow: "0 0 0px rgba(13, 110, 253, 0.3)",
          transition: "all 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#0d6efd";
          e.target.style.color = "white";
          e.target.style.boxShadow = "0 0 15px rgba(13, 110, 253, 0.6)";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
          e.target.style.color = "#0d6efd";
          e.target.style.boxShadow = "0 0 0px rgba(13, 110, 253, 0.3)";
          e.target.style.transform = "scale(1)";
        }}
      >
        Mark all as read
      </button>
    </div>

    {notifications.map((note) => (
      <div
        key={note.id}
        className="card shadow-sm mb-3 border-0"
        style={{
          borderRadius: "15px",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.01)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }}
      >
        <div className="card-body text-start">
          <h5 className="fw-bold text-dark mb-1">{note.title}</h5>
          <p className="text-muted mb-2">{note.message}</p>
          <small className="text-secondary">{note.time}</small>
        </div>
      </div>
    ))}

    {notifications.length === 0 && (
      <div className="text-center text-muted mt-5">
        <p>No new notifications right now.</p>
      </div>
    )}
  </div>
</div>
);
}