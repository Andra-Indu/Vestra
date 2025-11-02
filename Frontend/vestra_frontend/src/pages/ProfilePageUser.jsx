import React, { useState } from "react";
import { FaUserCircle, FaEdit, FaLock } from "react-icons/fa";

export default function ProfilePageUser() {
const [user, setUser] = useState({
name: "John Doe",
email: "jOYdP@example.com",
phone: "9876543210",
gender: "Male",
});

const [editMode, setEditMode] = useState(false);
const [passwordMode, setPasswordMode] = useState(false);
const [passwords, setPasswords] = useState({
oldPassword: "",
newPassword: "",
confirmPassword: "",
});

const handleChange = (e) => {
setUser({ ...user, [e.target.name]: e.target.value });
};

const handlePasswordChange = (e) => {
setPasswords({ ...passwords, [e.target.name]: e.target.value });
};

const handleSave = () => {
alert("Profile updated successfully!");
setEditMode(false);
};

const handlePasswordSave = () => {
if (passwords.newPassword !== passwords.confirmPassword) {
alert("Passwords do not match!");
return;
}
alert("Password updated successfully!");
setPasswordMode(false);
setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
};

return (
<div
className="d-flex flex-column min-vh-100"
style={{ backgroundColor: "#f8f9fa" }}
>
<div className="container py-5">
<div className="row justify-content-center">
{/* Profile Card */}
<div className="col-md-8 col-lg-6">
<div className="card shadow-sm border-0 rounded-4 p-4">
<div className="text-center mb-4">
<FaUserCircle size={80} color="#007bff" className="mb-3" />
<h4 className="fw-bold text-dark mb-1">{user.name}</h4>
<p className="text-muted mb-0">{user.email}</p>
<p className="text-muted">{user.phone}</p>
</div>

          <div className="d-flex justify-content-center gap-3 mb-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => setEditMode(true)}
            >
              <FaEdit className="me-2" />
              Edit Profile
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => setPasswordMode(true)}
            >
              <FaLock className="me-2" />
              Change Password
            </button>
          </div>

          <hr />

          <div>
            <h6 className="fw-semibold text-secondary mb-2">Profile Info</h6>
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Edit Profile Modal */}
  {editMode && (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Edit Profile</h5>
            <button
              className="btn-close"
              onClick={() => setEditMode(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-6">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Full Name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Phone"
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <select
                  name="gender"
                  className="form-select"
                  value={user.gender}
                  onChange={handleChange}
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Change Password Modal */}
  {passwordMode && (
    <div
      className="modal fade show"
      style={{
        display: "block",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Change Password</h5>
            <button
              className="btn-close"
              onClick={() => setPasswordMode(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-12">
                <input
                  type="password"
                  name="oldPassword"
                  className="form-control"
                  placeholder="Old Password"
                  value={passwords.oldPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  name="newPassword"
                  className="form-control"
                  placeholder="New Password"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="col-12">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                  value={passwords.confirmPassword}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setPasswordMode(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handlePasswordSave}
            >
              Update Password
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {/* Footer */}
  <footer
    className="mt-auto text-center py-3 bg-dark text-white"
    style={{ fontSize: "0.9rem" }}
  >
    © {new Date().getFullYear()} Vestra. All rights reserved.
  </footer>
</div>


);
}