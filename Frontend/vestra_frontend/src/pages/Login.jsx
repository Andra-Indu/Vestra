import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await API.post("/auth/login", form);
      const { token, name, email } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      setError(msg);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5" style={{ maxWidth: 500 }}>
        <h3 className="mb-3 text-center">Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-dark w-100" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-3">
          Don’t have an account?{" "}
          <Link to="/register" className="fw-bold text-decoration-none">
            Create Account
          </Link>
        </p>
      </div>
    </>
  );
}



































// import React, { useState } from "react";
// import API from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     try {
//       const res = await API.post("/auth/login", form);
//       const { token, name, email } = res.data;
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify({ name, email }));
//       navigate("/dashboard");
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Login failed";
//       setError(msg);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: 500 }}>
//       <h3 className="mb-3">Login</h3>
//       {error && <div className="alert alert-danger">{error}</div>}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label>Email</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <button className="btn btn-primary w-100" type="submit">
//           Login
//         </button>
//       </form>
//       <p className="mt-3">
//         Don’t have an account? <a href="/register">Register</a>
//       </p>
//     </div>
//   );
// }
