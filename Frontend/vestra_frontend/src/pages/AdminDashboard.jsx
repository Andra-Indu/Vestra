import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Inventory2 as ProductsIcon,
  ShoppingCart as OrdersIcon,
  People as UsersIcon,
  MonetizationOn as RevenueIcon,
} from "@mui/icons-material";
import API from "../api";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await API.get("/admin/stats");
      const data = res.data;

      setStats({
        totalProducts: data.totalProducts || 0,
        totalOrders: data.totalOrders || 0,
        totalUsers: data.totalUsers || 0,
        revenue: data.revenue || 0,
      });
    } catch (err) {
      console.error("❌ Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      path: "/admin/products",
      color: "linear-gradient(135deg, #42a5f5, #1e88e5)",
      icon: <ProductsIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      path: "/admin/orders",
      color: "linear-gradient(135deg, #66bb6a, #43a047)",
      icon: <OrdersIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      path: "/admin/users",
      color: "linear-gradient(135deg, #ffb74d, #fb8c00)",
      icon: <UsersIcon sx={{ fontSize: 45 }} />,
    },
    {
      title: "Total Revenue",
      value: `₹${stats.revenue.toLocaleString()}`,
      path: "/admin/reports",
      color: "linear-gradient(135deg, #ef5350, #d32f2f)",
      icon: <RevenueIcon sx={{ fontSize: 45 }} />,
    },
  ];

  return (
    <>
      <AdminNavbar />
      <Box
        sx={{
          p: { xs: 3, sm: 4, md: 6 },
          mt: 3,
          minHeight: "100vh",
          background: "linear-gradient(180deg, #f4f7fb 0%, #eef1f6 100%)",
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 5, color: "#2c3e50", letterSpacing: 0.5 }}
        >
          Admin Dashboard
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {cards.map((item, idx) => (
              <Grid item xs={12} sm={6} md={3} key={idx}>
                <Card
                  onClick={() => navigate(item.path)}
                  sx={{
                    cursor: "pointer",
                    textAlign: "center",
                    p: 2,
                    borderRadius: 4,
                    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                    background: item.color,
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.03)",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          borderRadius: "50%",
                          width: 70,
                          height: 70,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          mb: 2,
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ fontWeight: 600, letterSpacing: 0.5 }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        sx={{
                          mt: 1,
                          textShadow: "1px 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Quick Management Links */}
        <Box
          sx={{
            mt: 8,
            textAlign: "center",
            backgroundColor: "white",
            borderRadius: 4,
            p: 4,
            boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            gutterBottom
            sx={{ mb: 3, color: "#34495e" }}
          >
            Quick Management Links
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            {[
              { name: "Products", path: "/admin/products" },
              // { name: "Categories", path: "/admin/categories" },
              { name: "Orders", path: "/admin/orders" },
              { name: "Users", path: "/admin/users" },
              { name: "Reports", path: "/admin/reports" },
            ].map((link) => (
              <Button
                key={link.name}
                variant="contained"
                component={Link}
                to={link.path}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  background: "linear-gradient(135deg, #1976d2, #1565c0)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #1565c0, #0d47a1)",
                  },
                }}
              >
                Manage {link.name}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}
