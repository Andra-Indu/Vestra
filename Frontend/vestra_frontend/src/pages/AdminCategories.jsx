import React from "react";
import { Link } from "react-router-dom";

export default function AdminCategories() {
  return (
    <div className="container mt-5">
      <h3>Manage Categories</h3>
      <div className="card p-3">
        <p className="text-muted">Categories management section.</p>
      </div>
      <Link to="/adminDashboard" className="btn btn-link mt-3">← Back to Dashboard</Link>
    </div>
  );
}
