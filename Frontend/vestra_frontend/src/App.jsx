import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// User pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Jobs from "./pages/Jobs";
import Press from "./pages/Press";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import ProfilePageUser from "./pages/ProfilePageUser";
import OrdersPageUser from "./pages/OrderPageUser";
import SettingsPageUser from "./pages/SettingsPageUser";
import AddressPageUser from "./pages/AddressPageUser";
import WalletPageUser from "./pages/WalletPageUser";
import NotificationsPageUser from "./pages/NotificationPageUser";
import LogoutPageUser from "./pages/LogoutPageUser"; 
import PaymentPage from "./pages/PaymentPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminCategories from "./pages/AdminCategories";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminReports from "./pages/AdminReports";
import Analytics from "./pages/Analytics";
import Settings from "./pages/AdminSettings";
import Inventory from "./pages/Inventory";

// Components
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/press" element={<Press />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<Contact />} />
        
        {/* User Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userDashboard" element={<UserDashboard />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/add-product" element={<AddProduct />} /> */}
        <Route path="/order" element={<OrdersPageUser />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment/orders" element={<OrderSuccessPage />} />

        {/* Admin Routes */}
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        {/* User Profile Routes */}
        <Route path="/profile" element={<ProfilePageUser />} />
        <Route path="/orders" element={<OrdersPageUser />} />
        <Route path="/settings" element={<SettingsPageUser />} />
        <Route path="/address" element={<AddressPageUser />} />
        <Route path="/wallet" element={<WalletPageUser />} />
        <Route path="/notifications" element={<NotificationsPageUser />} />
        <Route path="/logout" element={<LogoutPageUser />} />
        
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
