import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api"; // ✅ axios instance

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("ALL");

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle delete user
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await API.delete(`/users/${id}`);
      const updated = users.filter((u) => u.id !== id);
      setUsers(updated);
      applyFilters(updated);
      alert("✅ User deleted successfully!");
    } catch (err) {
      console.error("❌ Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  // ✅ Promote user to admin
  const handleMakeAdmin = async (id) => {
    try {
      await API.put(`/users/${id}/make-admin`);
      alert("✅ User promoted to admin!");
      fetchUsers();
    } catch (err) {
      console.error("❌ Error updating role:", err);
      alert("Failed to update user role.");
    }
  };

  // ✅ Apply search + role filter
  useEffect(() => {
    applyFilters(users);
  }, [search, filterRole]);

  const applyFilters = (list) => {
    let filtered = list;

    // Filter by search text
    if (search.trim() !== "") {
      filtered = filtered.filter(
        (u) =>
          u.name.toLowerCase().includes(search.toLowerCase()) ||
          u.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by role
    if (filterRole !== "ALL") {
      filtered = filtered.filter((u) => u.role === filterRole);
    }

    setFilteredUsers(filtered);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-6 flex flex-col items-center"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div className="w-full max-w-6xl bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">👥 Manage Users</h2>
          <Link to="/adminDashboard" className="text-blue-600 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        {/* 🔍 Search + Filter Controls */}
        <div className="flex flex-wrap gap-3 items-center justify-between mb-5">
          <input
            type="text"
            placeholder="🔎 Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="ALL">All Roles</option>
            <option value="ADMIN">Admins</option>
            <option value="USER">Users</option>
          </select>
        </div>

        {/* 🧾 Users Table */}
        {loading ? (
          <div className="text-center py-10 text-gray-500 text-lg animate-pulse">
            Loading users...
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No matching users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Role</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-4 font-medium text-gray-700">{user.id}</td>
                    <td className="py-3 px-4 text-gray-700">{user.name}</td>
                    <td className="py-3 px-4 text-gray-600">{user.email}</td>
                    <td
                      className={`py-3 px-4 font-semibold ${
                        user.role === "ADMIN" ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {user.role || "USER"}
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      {user.role !== "ADMIN" && (
                        <button
                          onClick={() => handleMakeAdmin(user.id)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition"
                        >
                          Make Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
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
