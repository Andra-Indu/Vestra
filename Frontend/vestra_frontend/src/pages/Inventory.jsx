import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { motion } from "framer-motion";
import AdminNavbar from "../components/AdminNavbar";

export default function Inventory() {
  // mock inventory data for Vestra - Online Clothing Store
  const inventory = [
    { id: 1, sku: "VST-TSH-001", name: "Classic Cotton Tee", category: "T-Shirts", stock: 120, price: 12.99 },
    { id: 2, sku: "VST-JNS-010", name: "Slim Denim Jeans", category: "Jeans", stock: 85, price: 39.99 },
    { id: 3, sku: "VST-SHT-022", name: "Formal Shirt", category: "Shirts", stock: 60, price: 29.99 },
    { id: 4, sku: "VST-HDY-005", name: "Cozy Hoodie", category: "Hoodies", stock: 18, price: 49.99 },
    { id: 5, sku: "VST-JKT-002", name: "Bomber Jacket", category: "Jackets", stock: 8, price: 79.99 },
    { id: 6, sku: "VST-SKT-009", name: "Summer Skirt", category: "Women", stock: 0, price: 24.5 },
  ];

  const stockChartData = inventory.map((i) => ({ name: i.name, stock: i.stock }));

  const lowStock = (qty) => {
    if (qty === 0) return <Chip label="Out" color="error" />;
    if (qty < 20) return <Chip label="Low" color="warning" />;
    return <Chip label="In Stock" color="success" />;
  };

  return (
    <>
      <AdminNavbar />
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Inventory Management
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Manage Vestra product stock, monitor low inventory items and update quantities. Keeping stock healthy avoids missed sales and unhappy customers.
        </Typography>

        <Grid container spacing={3}>
          {/* Inventory Table */}
          <Grid item xs={12} md={8}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.2 }}>
              <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Product Stock List
                </Typography>

                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>SKU</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {inventory.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{row.sku}</TableCell>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.category}</TableCell>
                          <TableCell align="right">${row.price.toFixed(2)}</TableCell>
                          <TableCell align="center">{row.stock}</TableCell>
                          <TableCell align="center">{lowStock(row.stock)}</TableCell>
                          <TableCell align="right">
                            <Button size="small" variant="outlined" sx={{ mr: 1 }}>
                              Edit
                            </Button>
                            <Button size="small" variant="contained" color="error">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </motion.div>
          </Grid>

          {/* Stock Chart */}
          <Grid item xs={12} md={4}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
              <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 3, height: "100%" }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Stock Levels
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Visual view of product quantities — focus on items with low or zero inventory.
                </Typography>

                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={stockChartData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={150} />
                    <Tooltip />
                    <Bar dataKey="stock" fill="#1976d2" barSize={12} />
                  </BarChart>
                </ResponsiveContainer>

                <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
                  <Button variant="outlined">Export CSV</Button>
                  <Button variant="contained">Sync Inventory</Button>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
