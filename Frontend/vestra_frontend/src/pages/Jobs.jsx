import { Box, Typography, Container, Button } from "@mui/material";

const Jobs = () => {
  return (
    <Container maxWidth="md" sx={{ py: 10 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" align="center">
        Careers at VESTRA
      </Typography>
      <Typography variant="body1" align="center" sx={{ color: "text.secondary", mb: 3 }}>
        Join our growing team and help us shape the future of online fashion! 
        We’re looking for creative minds and passionate problem-solvers.
      </Typography>
      <Box textAlign="center">
        <Button variant="contained" color="primary">
          View Open Positions
        </Button>
      </Box>
    </Container>
  );
};

export default Jobs;
