import { Box, Typography, Container } from "@mui/material";

const Press = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        Press & Media
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "text.secondary" }}>
        For press inquiries, media kits, and collaboration requests, please contact our communications team at 
        <strong> press@vestra.com</strong>.
      </Typography>
    </Container>
  );
};

export default Press;
