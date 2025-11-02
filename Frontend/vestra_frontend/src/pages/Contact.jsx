import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks ${form.name}, your message has been sent!`);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <Box sx={{ bgcolor: "#fafafa", color: "text.primary", py: 8 }}>
      {/* ================= HEADER SECTION ================= */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#111" }}
        >
          Get in Touch with <span style={{ color: "#1976d2" }}>VESTRA</span>
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", fontSize: "1.1rem" }}>
          Have a question, feedback, or just want to say hello?  
          We’d love to hear from you! Our team is here to assist with product inquiries,
          order issues, or partnership opportunities.
        </Typography>
      </Container>

      {/* ================= WEBSITE OVERVIEW SECTION ================= */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
              alt="About VESTRA"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Why Choose VESTRA?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              At <strong>VESTRA Fashion</strong>, we bring you the latest trends,
              premium-quality fabrics, and a seamless shopping experience — all at
              your fingertips.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              From streetwear to luxury fashion, every product in our collection is
              designed to help you express your individuality with confidence and
              comfort.
            </Typography>
            <Typography variant="body1">
              Our mission is simple: **Style meets technology.** Whether it’s our
              AI-powered chatbot, secure payment gateways, or fast delivery — we’re
              redefining the way you shop online.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* ================= PRODUCT PREVIEW SECTION ================= */}
      <Box sx={{ bgcolor: "#111", color: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Explore Our Top Picks
          </Typography>
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ mb: 5, color: "rgba(255,255,255,0.7)" }}
          >
            Handpicked styles from our latest collection — because you deserve the best.
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Elegant Red Dress",
                img: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
              },
              {
                title: "Classic Denim Jacket",
                img: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=500&q=60",
              },
              {
                title: "Stylish Men's Hoodie",
                img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80",
              },
            ].map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.title}>
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "white",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.img}
                    alt={product.title}
                    sx={{
                      height: 280,
                      objectFit: "cover",
                      filter: "brightness(0.9)",
                      "&:hover": { filter: "brightness(1)" },
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {product.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= CONTACT FORM SECTION ================= */}
      <Container maxWidth="sm" sx={{ mt: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Contact Us
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 4, color: "text.secondary" }}
        >
          Fill out the form below and we’ll get back to you within 24 hours.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            bgcolor: "white",
            p: 4,
            borderRadius: 3,
            boxShadow: 3,
          }}
        >
          <TextField
            label="Your Name"
            name="name"
            variant="outlined"
            value={form.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Your Email"
            name="email"
            type="email"
            variant="outlined"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Your Message"
            name="message"
            variant="outlined"
            multiline
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#1976d2",
              "&:hover": { bgcolor: "#1565c0" },
              fontWeight: "bold",
            }}
          >
            Send Message
          </Button>
        </Box>
      </Container>

      {/* ================= FOOTER NOTE ================= */}
      <Typography
        variant="body2"
        textAlign="center"
        sx={{ mt: 8, color: "text.secondary" }}
      >
        © 2025 <strong>VESTRA FASHION</strong>. All rights reserved.
      </Typography>
    </Box>
  );
}
