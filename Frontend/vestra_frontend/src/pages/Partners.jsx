import { Box, Typography, Container, Button } from "@mui/material";

const Partners = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        Our Partners
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "text.secondary", mb: 3 }}>
        We’re proud to collaborate with top brands, designers, and logistics providers 
        who share our commitment to excellence and customer satisfaction.
      </Typography>
      <Box textAlign="center">
        <Button variant="outlined" color="secondary">
          Become a Partner
        </Button>
      </Box>
    </Container>
  );
};

export default Partners;
