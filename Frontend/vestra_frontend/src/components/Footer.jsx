import { Grid, Typography, Box, Container, useMediaQuery, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const socialLinks = [
    { icon: <FaFacebookF />, color: "#1877F2", url: "https://www.facebook.com/bitupan.phukan.35" },
    { icon: <FaInstagram />, color: "#E4405F", url: "" },
    { icon: <FaTwitter />, color: "#1DA1F2", url: "" },
    { icon: <FaLinkedinIn />, color: "#0A66C2", url: "" },
    { icon: <FaGithub />, color: "#fff", url: "https://github.com/Andra-Indu/Vestra" },
  ];

  return (
    <Box
      sx={{
        bgcolor: "#000",
        color: "white",
        py: { xs: 3, sm: 4 },
        mt: "auto",
        textAlign: "center",
        position: "relative",
        bottom: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 6 }}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ mb: 2 }}
        >
          {[
            {
              title: "Company",
              links: [
                { text: "About", link: "/about" },
                { text: "Blog", link: "/blog" },
                { text: "Jobs", link: "/jobs" },
                { text: "Contact", link: "/contact" },
              ],
            },
            {
              title: "Solutions",
              links: [
                { text: "Marketing" },
                { text: "Analytics" },
                { text: "Commerce" },
                { text: "Insights" },
              ],
            },
            {
              title: "Documentation",
              links: [{ text: "Guides" }, { text: "API Status" }],
            },
            {
              title: "Legal",
              links: [{ text: "Claim" }, { text: "Privacy" }, { text: "Terms" }],
            },
          ].map(({ title, links }) => (
            <Grid item xs={12} sm={6} md={3} key={title}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                fontWeight="bold"
                sx={{ color: "#f8d210" }}
              >
                {title}
              </Typography>
              {links.map(({ text, link }) => (
                <Typography
                  key={text}
                  variant="body2"
                  component={link ? Link : "p"}
                  to={link || "#"}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    color: "inherit",
                    my: 0.5,
                    cursor: "pointer",
                    opacity: 0.8,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      opacity: 1,
                      color: "#f8d210",
                      transform: "translateX(3px)",
                    },
                  }}
                >
                  {text}
                </Typography>
              ))}
            </Grid>
          ))}
        </Grid>

        {/* Divider Line */}
        <Box
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.2)",
            my: 3,
            width: "80%",
            mx: "auto",
          }}
        />

        {/* Social Icons */}
        <Box sx={{ mb: 2 }}>
          {socialLinks.map(({ icon, color, url }, i) => (
            <IconButton
              key={i}
              sx={{
                color,
                mx: 0.5,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.2) rotate(5deg)",
                  color,
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={() => {
                if (url) window.open(url, "_blank");
              }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>

        {/* Bottom Footer Text */}
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          © 2025 <strong>VESTRA</strong> — All rights reserved.
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Crafted with ❤️ using React & Spring Boot.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
