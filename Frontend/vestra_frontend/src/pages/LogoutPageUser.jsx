import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutPageUser() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/login");
  }, [navigate]);
  return (
    <div className="container py-5 text-center">
      <h3 className="text-danger fw-bold">Logging out...</h3>
    </div>
  );
}
