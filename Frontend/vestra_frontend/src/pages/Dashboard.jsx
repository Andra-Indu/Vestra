import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/auth/me")
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h3>Dashboard</h3>
      {user ? (
        <>
          <p>Welcome, <strong>{user.name}</strong></p>
          <p>Email: {user.email}</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
