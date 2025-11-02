import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  useTheme,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import AdminNavbar from "../components/AdminNavbar";

export default function Analytics() {
  const theme = useTheme();

  // Mock chart data
  const salesData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3000 },
    { month: "Mar", sales: 5000 },
    { month: "Apr", sales: 4780 },
    { month: "May", sales: 5890 },
    { month: "Jun", sales: 6390 },
    { month: "Jul", sales: 7200 },
  ];

  const categoryData = [
    { category: "Men", revenue: 5000 },
    { category: "Women", revenue: 8000 },
    { category: "Kids", revenue: 3500 },
    { category: "Accessories", revenue: 2000 },
  ];

  const trafficData = [
    { name: "Direct", value: 45 },
    { name: "Social", value: 25 },
    { name: "Referral", value: 15 },
    { name: "Organic", value: 15 },
  ];

  const COLORS = ["#1976d2", "#42a5f5", "#90caf9", "#1565c0"];

  const summaryCards = [
    {
      title: "Total Revenue",
      value: "$128,450",
      color: "#1976d2",
      subtitle: "This Month",
    },
    {
      title: "Active Users",
      value: "2,340",
      color: "#42a5f5",
      subtitle: "In Last 7 Days",
    },
    {
      title: "Total Orders",
      value: "1,158",
      color: "#64b5f6",
      subtitle: "Completed Orders",
    },
    {
      title: "Conversion Rate",
      value: "4.2%",
      color: "#90caf9",
      subtitle: "Growth +1.1%",
    },
  ];

  return (
    <>
      <AdminNavbar />

      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          Analytics Dashboard
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, textAlign: "center" }}
        >
          Welcome to Vestra Analytics — get insights into sales performance,
          customer behavior, and product trends powering your online clothing
          store.
        </Typography>

        {/* ✨ Summary Cards Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 3,
                    boxShadow: 3,
                    background: theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #1e1e1e, #333)"
                      : "linear-gradient(135deg, #e3f2fd, #ffffff)",
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "text.secondary" }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{ color: card.color, my: 1 }}
                  >
                    {card.value}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary" }}
                  >
                    {card.subtitle}
                  </Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* 📊 Charts Section */}
        <Grid container spacing={4}>
          {/* Sales Trends */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 4,
                height: 400,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                Monthly Sales Trends
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#1976d2"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Revenue by Category */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 4,
                height: 400,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                Revenue by Category
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#42a5f5" barSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Traffic Sources */}
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 4,
                height: 400,
              }}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                gutterBottom
                color="primary"
              >
                Traffic Sources
              </Typography>
              <ResponsiveContainer width="100%" height="90%">
                <PieChart>
                  <Pie
                    data={trafficData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {trafficData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
