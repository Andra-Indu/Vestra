import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  FormControlLabel,
  Switch,
  Button,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import AdminNavbar from "../components/AdminNavbar";

export default function Settings() {
  const [form, setForm] = useState({
    storeName: "Vestra Online Clothing",
    adminEmail: "admin@vestra.com",
    currency: "USD",
    taxRate: 5,
    enableReviews: true,
  });

  const handleChange = (key) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((s) => ({ ...s, [key]: val }));
  };

  const handleSave = () => {
    // placeholder save - replace with API call to save settings
    console.log("Saving settings:", form);
    alert("Settings saved (mock)");
  };

  return (
    <>
      <AdminNavbar />
      <Box sx={{ p: { xs: 3, md: 5 } }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Store Settings
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Configure Vestra store details — branding, admin contact, currency and key platform options.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  General Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Store Name"
                      value={form.storeName}
                      onChange={handleChange("storeName")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Admin Email"
                      value={form.adminEmail}
                      onChange={handleChange("adminEmail")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Currency"
                      value={form.currency}
                      onChange={handleChange("currency")}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Tax Rate (%)"
                      type="number"
                      value={form.taxRate}
                      onChange={handleChange("taxRate")}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={form.enableReviews}
                          onChange={(e) => setForm((s) => ({ ...s, enableReviews: e.target.checked }))}
                        />
                      }
                      label="Enable Product Reviews"
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                      <Button variant="outlined">Reset Defaults</Button>
                      <Button variant="contained" onClick={handleSave}>
                        Save Settings
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ duration: 0.15 }}>
              <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
                <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                  Store Preview & Quick Actions
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  This panel shows a quick preview of your store brand and provides helpful actions for immediate tasks.
                </Typography>

                <Box sx={{ background: "#fff", p: 2, borderRadius: 2, mb: 2 }}>
                  <Typography variant="subtitle1" fontWeight="600">
                    Vestra Online Clothing
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Modern, sustainable fashion for everyone.
                  </Typography>
                </Box>

                <Button fullWidth variant="contained" sx={{ mb: 1 }}>
                  View Store
                </Button>
                <Button fullWidth variant="outlined" sx={{ mb: 1 }}>
                  Clear Cache
                </Button>
                <Button fullWidth variant="outlined" color="error">
                  Disable Store (Mock)
                </Button>
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
