import { Box, Typography, Container } from "@mui/material";

const Blog = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        Blog
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "text.secondary" }}>
        Explore our latest articles, style guides, and trend insights curated by the <strong>VESTRA</strong> fashion experts. 
        Stay inspired and updated with our latest collections and stories.
      </Typography>
    </Container>
  );
};

export default Blog;
