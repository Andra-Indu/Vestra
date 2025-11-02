import React, { useState } from "react";
import { FaBell, FaMoon, FaSun, FaLock, FaTrashAlt, FaSave } from "react-icons/fa";

export default function SettingsPageUser() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [privacy, setPrivacy] = useState("public");

  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleNotifications = () => setNotifications(!notifications);
  const handlePrivacyChange = (e) => setPrivacy(e.target.value);

  const handleSave = () => {
    alert("Settings updated successfully!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      alert("Your account has been deleted (simulation).");
    }
  };

  return (
    <>
    
    <div
      className={`d-flex flex-column min-vh-100 ${darkMode ? "bg-dark text-white" : "bg-light text-dark"}`}
      style={{
        transition: "all 0.3s ease",
      }}
    >
      <div className="container py-5">
      <div className="text-center mb-5">
      <h2 className="fw-bold text-primary mb-2">⚙️ Account Settings</h2>
      <p className="text-muted">
        Manage your preferences, notifications, and privacy options.
      </p>
    </div>

    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div
          className="card border-0 shadow-sm rounded-4 p-4 mb-4"
          style={{
            backgroundColor: darkMode ? "#212529" : "#fff",
            color: darkMode ? "#f8f9fa" : "#000",
          }}
        >
          <h5 className="fw-bold mb-3">
            <FaBell className="me-2 text-warning" />
            Notification Settings
          </h5>
          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={notifications}
              onChange={toggleNotifications}
              id="notificationsSwitch"
            />
            <label className="form-check-label" htmlFor="notificationsSwitch">
              {notifications
                ? "Notifications Enabled"
                : "Notifications Disabled"}
            </label>
          </div>
          <small className="text-muted">
            Get updates about new offers, order status, and recommendations.
          </small>
        </div>

        {/* Theme Section */}
        <div
          className="card border-0 shadow-sm rounded-4 p-4 mb-4"
          style={{
            backgroundColor: darkMode ? "#212529" : "#fff",
            color: darkMode ? "#f8f9fa" : "#000",
          }}
        >
          <h5 className="fw-bold mb-3">
            {darkMode ? (
              <FaSun className="me-2 text-warning" />
            ) : (
              <FaMoon className="me-2 text-secondary" />
            )}
            Theme Preference
          </h5>
          <button
            className={`btn ${darkMode ? "btn-light" : "btn-dark"
              } px-4 py-2 rounded-pill`}
            onClick={toggleTheme}
          >
            Switch to {darkMode ? "Light" : "Dark"} Mode
          </button>
          <small className="d-block mt-2 text-muted">
            Personalize your browsing experience.
          </small>
        </div>

        {/* Privacy Section */}
        <div
          className="card border-0 shadow-sm rounded-4 p-4 mb-4"
          style={{
            backgroundColor: darkMode ? "#212529" : "#fff",
            color: darkMode ? "#f8f9fa" : "#000",
          }}
        >
          <h5 className="fw-bold mb-3">
            <FaLock className="me-2 text-info" />
            Privacy Settings
          </h5>
          <div className="form-group">
            <label className="form-label">Profile Visibility:</label>
            <select
              className="form-select"
              value={privacy}
              onChange={handlePrivacyChange}
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          <small className="d-block mt-2 text-muted">
            Control who can see your activity and personal information.
          </small>
        </div>

        {/* Save / Delete Section */}
        <div
          className="card border-0 shadow-sm rounded-4 p-4"
          style={{
            backgroundColor: darkMode ? "#212529" : "#fff",
            color: darkMode ? "#f8f9fa" : "#000",
          }}
        >
          <h5 className="fw-bold mb-3">Account Management</h5>
          <div className="d-flex justify-content-between align-items-center">
            <button
              className="btn btn-success px-4 rounded-pill"
              onClick={handleSave}
            >
              <FaSave className="me-2" />
              Save Changes
            </button>
            <button
              className="btn btn-outline-danger px-4 rounded-pill"
              onClick={handleDeleteAccount}
            >
              <FaTrashAlt className="me-2" />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

{/* Footer */ }
<footer
  className={`mt-auto text-center py-3 ${darkMode ? "bg-secondary text-light" : "bg-dark text-white"
    }`}
  style={{ fontSize: "0.9rem" }}
>
  © {new Date().getFullYear()} Vestra — Your style, your way.
</footer>
</div>
</>
);
}