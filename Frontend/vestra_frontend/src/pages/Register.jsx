import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/auth/register", form);
      console.log("Registration success:", response.data);

      setSuccess("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response?.status === 403) {
        setError("You are not allowed to register. (403 Forbidden)");
      } else if (err.response?.status === 400) {
        setError(err.response?.data || "Email already exists!");
      } else {
        setError("Registration failed. Please try again!");
      }
    }
  };

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(135deg, #f0f3ff 0%, #e2f6ff 100%)",
      }}
    >
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center py-5">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card shadow-lg border-0 p-4"
          style={{
            borderRadius: "20px",
            width: "100%",
            maxWidth: "450px",
            background: "white",
          }}
        >
          <h3 className="fw-bold text-center mb-3" style={{ color: "#0d6efd" }}>
            Create Your Account ✨
          </h3>
          <p className="text-center text-muted mb-4">
            Join <strong>Vestra</strong> and start your shopping journey today!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0d6efd")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0d6efd")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a strong password"
                value={form.password}
                onChange={handleChange}
                required
                className="form-control"
                style={{
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#0d6efd")}
                onBlur={(e) => (e.target.style.borderColor = "#ccc")}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Role</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="form-select"
                style={{
                  borderRadius: "10px",
                  padding: "10px 12px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            {error && (
              <p className="text-danger text-center mb-3 fw-semibold">{error}</p>
            )}
            {success && (
              <p className="text-success text-center mb-3 fw-semibold">
                {success}
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn w-100 fw-semibold"
              style={{
                backgroundColor: "#0d6efd",
                color: "white",
                borderRadius: "30px",
                padding: "10px 0",
                boxShadow: "0 4px 10px rgba(13,110,253,0.3)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 4px 20px rgba(13,110,253,0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "0 4px 10px rgba(13,110,253,0.3)";
              }}
            >
              Register
            </motion.button>

            <hr className="my-4" />

            <p className="text-center mb-0">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "#0d6efd",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
