import React, { useState } from "react";
import { FaHome, FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

export default function AddressPageUser() {
const [addresses, setAddresses] = useState([
{
id: 1,
name: "John Doe",
phone: "9876543210",
street: "123 MG Road",
city: "Bangalore",
state: "Karnataka",
pincode: "560001",
type: "Home",
},
]);

const [newAddress, setNewAddress] = useState({
name: "",
phone: "",
street: "",
city: "",
state: "",
pincode: "",
type: "Home",
});

const [showForm, setShowForm] = useState(false);

const handleChange = (e) => {
setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
};

const handleAdd = () => {
if (
!newAddress.name ||
!newAddress.phone ||
!newAddress.street ||
!newAddress.city ||
!newAddress.state ||
!newAddress.pincode
) {
alert("Please fill all fields!");
return;
}

setAddresses([
  ...addresses,
  { ...newAddress, id: Date.now(), type: newAddress.type || "Home" },
]);
setNewAddress({
  name: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pincode: "",
  type: "Home",
});
setShowForm(false);


};

const handleDelete = (id) => {
if (window.confirm("Are you sure you want to delete this address?")) {
setAddresses(addresses.filter((a) => a.id !== id));
}
};

return (
<div
className="d-flex flex-column min-vh-100"
style={{ backgroundColor: "#f8f9fa" }}
>
{/* Page Header */}
<div className="container py-5 text-center">
<h2 className="fw-bold text-primary mb-2">
<FaHome className="me-2" />
Address Book
</h2>
<p className="text-muted mb-4">
Manage your saved delivery addresses easily.
</p>

    {/* Add New Button */}
    <button
      className="btn btn-dark px-4 py-2 rounded-pill"
      onClick={() => setShowForm(true)}
    >
      <FaPlus className="me-2" />
      Add New Address
    </button>
  </div>

  {/* Address List */}
  <div className="container">
    <div className="row g-4">
      {addresses.map((addr) => (
        <div className="col-md-6 col-lg-4" key={addr.id}>
          <div
            className="card shadow-sm border-0 rounded-4"
            style={{ minHeight: "230px" }}
          >
            <div className="card-body">
              <h5 className="fw-bold text-dark mb-1">{addr.name}</h5>
              <p className="text-muted small mb-2">{addr.phone}</p>
              <p className="mb-1">
                {addr.street}, {addr.city}
              </p>
              <p className="mb-1">
                {addr.state} - {addr.pincode}
              </p>
              <span className="badge bg-primary">{addr.type}</span>

              <div className="d-flex justify-content-end gap-2 mt-3">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => alert("Edit feature coming soon!")}
                >
                  <FaEdit />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(addr.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {addresses.length === 0 && (
        <p className="text-center text-muted mt-4">
          No addresses saved yet.
        </p>
      )}
    </div>
  </div>

  {/* Add Address Modal */}
  {showForm && (
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
            <h5 className="modal-title fw-bold">Add New Address</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowForm(false)}
            ></button>
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="form-control"
                  value={newAddress.name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  className="form-control"
                  value={newAddress.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  className="form-control"
                  value={newAddress.street}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  className="form-control"
                  value={newAddress.city}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  className="form-control"
                  value={newAddress.state}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  name="pincode"
                  placeholder="Pincode"
                  className="form-control"
                  value={newAddress.pincode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6">
                <select
                  name="type"
                  className="form-select"
                  value={newAddress.type}
                  onChange={handleChange}
                >
                  <option>Home</option>
                  <option>Work</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={handleAdd}>
              Save Address
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