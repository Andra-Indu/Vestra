import { Box, Typography, Container, Grid, Button, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa", color: "text.primary", py: 8 }}>
      {/* ================= HEADER SECTION ================= */}
      <Container maxWidth="md" sx={{ textAlign: "center", mb: 8 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#111", letterSpacing: 1 }}
        >
          About <span style={{ color: "#1976d2" }}>VESTRA</span>
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: "1.1rem" }}
        >
          Welcome to <strong>VESTRA Fashion</strong> — where technology meets
          trend. We’re an innovative e-commerce platform offering a curated
          collection of premium, sustainable, and stylish clothing for men,
          women, and kids. Our mission is to make fashion accessible,
          affordable, and ethical for everyone.
        </Typography>
      </Container>

      {/* ================= MISSION & VISION SECTION ================= */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80"
              alt="VESTRA Fashion"
              sx={{
                width: "100%",
                borderRadius: 3,
                boxShadow: 3,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              To redefine online shopping by blending high-end fashion with smart
              technology and customer-first service. We aim to be the go-to
              fashion destination for modern, conscious shoppers across the globe.
            </Typography>

            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1">
              We believe in empowering individuality. Our mission is to offer
              diverse styles, seamless shopping experiences, and fast delivery
              — backed by transparent pricing and sustainable sourcing.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      {/* ================= VALUES SECTION ================= */}
      <Box sx={{ bgcolor: "#111", color: "white", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            gutterBottom
          >
            Our Core Values
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              {
                title: "Customer First",
                desc: "We listen, we care, and we deliver beyond expectations.",
              },
              {
                title: "Sustainability",
                desc: "We source responsibly and minimize our environmental footprint.",
              },
              {
                title: "Innovation",
                desc: "We use cutting-edge tech to make your shopping smarter and easier.",
              },
              {
                title: "Quality",
                desc: "Every product is curated to ensure comfort, style, and durability.",
              },
            ].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    bgcolor: "rgba(255,255,255,0.05)",
                    color: "white",
                    borderRadius: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    transition: "transform 0.3s ease",
                    "&:hover": { transform: "translateY(-5px)" },
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{ color: "#90caf9" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2">{item.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ================= TEAM SECTION ================= */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          gutterBottom
        >
          Meet Our Team
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          sx={{ mb: 6, color: "text.secondary" }}
        >
          Behind every product, there’s a passionate team shaping the next
          chapter of VESTRA. From design to delivery, we work hand-in-hand to
          create fashion that feels as good as it looks.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {[
            {
              name: "INDU ANDRA",
              role: "Founder & CEO",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0EYRU03TBeHPg9ptiTGHhU5FhcnABaPs3gw&s",
            },
            {
              name: "UDAYCHANDRA ANDRA",
              role: "Head of Design",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq4qnak62s-UH75qbw2ZXxvEhHDAkmsdhBHg&s",
            },
            {
              name: "BITUPAN PHUKAN",
              role: "Marketing Lead",
              img: "https://scontent.fblr22-1.fna.fbcdn.net/v/t39.30808-6/483468832_2053122548532148_8080273802803615316_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=a5f93a&_nc_ohc=BFvvE4-YutYQ7kNvwGXCEzz&_nc_oc=AdkQGHqe8uekgCKQKgasBkmnS09cjaQxHQw9pQJ2LgQTKRvdrg9BLir_MNXS4coqKR8&_nc_zt=23&_nc_ht=scontent.fblr22-1.fna&_nc_gid=_kNOQ-DXfAlAIdcLCAFAgg&oh=00_AfdqXEsfvQiBNVqLMakd5ybzDH2uSg0C9b-gEjk5Ahad6Q&oe=690990D2",
            },
            {
              name: "DONATUS UDOKA",
              role: "Chief Technology Officer",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ge5ZNd1jtWQIUJVaZhczOC8H1JNSlg443g&s",
            },
            {
              name: "RAJKIRAN NANDI",
              role: "Logistics Manager",
              img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjk1tVipWnRnQNsM3BWLsfdCQfnulrlrqEXA&s",
            },
          ].map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <Card
                sx={{
                  textAlign: "center",
                  borderRadius: 3,
                  boxShadow: 3,
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "translateY(-5px)" },
                }}
              >
                <Box
                  component="img"
                  src={member.img}
                  alt={member.name}
                  sx={{
                    width: "100%",
                    height: 280,
                    objectFit: "cover",
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                  }}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {member.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {member.role}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ================= CTA SECTION ================= */}
      <Box
        sx={{
          bgcolor: "#1976d2",
          color: "white",
          py: 8,
          textAlign: "center",
          mt: 5,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Be Part of Our Journey
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Join thousands of satisfied shoppers and experience the future of
          fashion with <strong>VESTRA</strong>.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "white",
            color: "#1976d2",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#f0f0f0" },
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
};

export default About;
