import React, { useState } from "react";
import { FaWallet, FaArrowUp, FaArrowDown, FaGift, FaPlusCircle } from "react-icons/fa";

export default function WalletPageUser() {
const [balance, setBalance] = useState(2350.75);
const [transactions, setTransactions] = useState([
{ id: 1, type: "credit", amount: 500, description: "Cashback Offer", date: "Oct 25, 2025" },
{ id: 2, type: "debit", amount: 999, description: "Order #A1042", date: "Oct 22, 2025" },
{ id: 3, type: "credit", amount: 250, description: "Referral Bonus", date: "Oct 18, 2025" },
{ id: 4, type: "debit", amount: 1499, description: "Order #A1029", date: "Oct 14, 2025" },
]);

const handleAddMoney = () => {
const add = window.prompt("Enter amount to add to your wallet:");
if (add && !isNaN(add)) {
const amount = parseFloat(add);
setBalance(balance + amount);
setTransactions([
{ id: Date.now(), type: "credit", amount, description: "Added to Wallet", date: new Date().toDateString() },
...transactions,
]);
alert(`₹${amount} added successfully!`);
}
};

return (
<div className="d-flex flex-column min-vh-100 bg-light">
<div className="container py-5">
<div className="text-center mb-5">
<h2 className="fw-bold text-primary mb-2">
<FaWallet className="me-2" />
Vestra Wallet
</h2>
<p className="text-muted">
Check your wallet balance, recharge instantly, and view recent transactions.
</p>
</div>

    {/* Wallet Card */}
    <div className="card shadow-sm border-0 rounded-4 mb-4 mx-auto" style={{ maxWidth: "500px" }}>
      <div className="card-body text-center p-4">
        <h5 className="fw-semibold text-secondary">Available Balance</h5>
        <h1 className="fw-bold text-success display-5 mb-3">₹{balance.toFixed(2)}</h1>
        <button className="btn btn-primary px-4 rounded-pill" onClick={handleAddMoney}>
          <FaPlusCircle className="me-2" />
          Add Money
        </button>
      </div>
    </div>

    {/* Cashback Offers */}
    <div className="card border-0 shadow-sm rounded-4 mb-4 mx-auto" style={{ maxWidth: "700px" }}>
      <div className="card-body">
        <h5 className="fw-bold mb-3 text-dark">
          <FaGift className="me-2 text-warning" />
          Exclusive Cashback Offers
        </h5>
        <ul className="list-group list-group-flush">
          <li className="list-group-item bg-light">
            💸 Get <strong>10% cashback</strong> on prepaid orders above ₹999.
          </li>
          <li className="list-group-item bg-light">
            🎁 Earn <strong>₹50 bonus</strong> on every friend referral.
          </li>
          <li className="list-group-item bg-light">
            ⚡ Instant refund for canceled orders credited to wallet.
          </li>
        </ul>
      </div>
    </div>

    {/* Transactions Section */}
    <div className="card border-0 shadow-sm rounded-4 mx-auto" style={{ maxWidth: "700px" }}>
      <div className="card-body">
        <h5 className="fw-bold mb-3 text-dark">Recent Transactions</h5>
        {transactions.length === 0 ? (
          <p className="text-muted text-center py-3">No recent transactions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th className="text-secondary">Date</th>
                  <th className="text-secondary">Description</th>
                  <th className="text-secondary text-end">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id}>
                    <td className="text-muted">{txn.date}</td>
                    <td>
                      {txn.type === "credit" ? (
                        <FaArrowDown className="text-success me-2" />
                      ) : (
                        <FaArrowUp className="text-danger me-2" />
                      )}
                      {txn.description}
                    </td>
                    <td
                      className={`fw-semibold text-end ${
                        txn.type === "credit" ? "text-success" : "text-danger"
                      }`}
                    >
                      {txn.type === "credit" ? "+" : "-"}₹{txn.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>

  {/* Footer */}
  <footer className="mt-auto bg-dark text-white text-center py-3">
    © {new Date().getFullYear()} Vestra Wallet — Fast, Secure & Rewarding 💰
  </footer>
</div>


);
}