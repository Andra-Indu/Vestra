import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", form);
      console.log("Login success:", response.data);

      const { token, role } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", form.email);

      alert("Login successful!");

      if (role?.toUpperCase() === "ADMIN") navigate("/adminDashboard");
      else if (role?.toUpperCase() === "USER") navigate("/userDashboard");
      else navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon! 🌐");
  };

  const handleFacebookLogin = () => {
    alert("Facebook login coming soon! 📘");
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
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="card shadow-lg border-0 p-4"
          style={{
            borderRadius: "20px",
            width: "100%",
            maxWidth: "420px",
            background: "white",
          }}
        >
          <h3 className="fw-bold text-center mb-3" style={{ color: "#0d6efd" }}>
            Welcome Back 👋
          </h3>
          <p className="text-center text-muted mb-4">
            Sign in to continue shopping on <strong>Vestra</strong>
          </p>

          <form onSubmit={handleSubmit}>
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

            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
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

            {error && <p className="text-danger text-center mb-3">{error}</p>}

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
              Login
            </motion.button>

            <div className="text-center mt-3">
              <Link
                to="#"
                className="text-decoration-none"
                style={{ color: "#0d6efd", fontSize: "0.9rem" }}
              >
                Forgot Password?
              </Link>
            </div>
          </form>

          <div className="text-center my-3">
            <hr className="my-3" />
            <span className="text-muted small">or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGoogleLogin}
              className="btn d-flex align-items-center justify-content-center shadow-sm"
              style={{
                backgroundColor: "white",
                color: "#DB4437",
                borderRadius: "30px",
                padding: "8px 20px",
                border: "1px solid #ddd",
              }}
            >
              <i className="bi bi-google me-2"></i> Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFacebookLogin}
              className="btn d-flex align-items-center justify-content-center shadow-sm"
              style={{
                backgroundColor: "#1877f2",
                color: "white",
                borderRadius: "30px",
                padding: "8px 20px",
                border: "none",
              }}
            >
              <i className="bi bi-facebook me-2"></i> Facebook
            </motion.button>
          </div>

          <hr className="my-3" />
          <div className="text-center">
            <p className="mb-0">
              Don’t have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "#0d6efd",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
