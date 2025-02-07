import React from "react";
import { Typography, Box, Button, Container, Grid, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate(); // React Router's navigation hook

  const handleUploadClick = () => {
    navigate("/upload"); // Navigate to the Upload page
  };

  return (
    <Box sx={{ backgroundColor: "#B2A599", color: "#484237", minHeight: "100vh" }}>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: "url('./images/btrzwpb.jpg')", // Replace with actual background image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontFamily: "'Syne', sans-serif",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            color: "#484237",
          }}
        >
          Welcome to <span style={{ color: "#D3C5B6" }}>CautisCloud</span>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            fontSize: "1.2rem",
            fontStyle: "italic",
            textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5)",
            color: "#484237",
          }}
        >
          Secure Cloud Storage using Assortive encryption methods
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            onClick={handleUploadClick} // Click handler for navigation
            variant="contained"
            sx={{
              px: 4,
              py: 2,
              borderRadius: "30px",
              backgroundColor: "#D3C5B6",
              color: "#484237",
              boxShadow: "0px 4px 10px rgba(211, 197, 182, 0.5)",
              "&:hover": {
                backgroundColor: "#B2A599",
              },
            }}
          >
            Upload
          </Button>
        </Box>
      </Box>

      {/* About Section */}
      <Container sx={{ py: 8, backgroundColor: "#D3C5B6", borderRadius: "10px", color: "#484237" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
          CautisCloud: <span style={{ color: "#484237" }}>Secure Your Digital Assets</span>
        </Typography>
        <Typography variant="body1" align="center" sx={{ fontSize: "1.1rem", mb: 6 }}>
          CautisCloud is a safe and secure cloud storage platform that prioritizes security, offering a seamless and
          intuitive experience for protecting your digital assets. Our encryption and decentralized architecture
          ensure your data is always safe and accessible.
        </Typography>
      </Container>

      {/* Features Section */}
      <Container sx={{ py: 6, backgroundColor: "#D3C5B6", borderRadius: "10px", color: "#484237" }}>
        <Typography variant="h4" align="center" sx={{ mb: 4, fontWeight: "bold" }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, textAlign: "center", p: 3, backgroundColor: "#B2A599" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                File Splitting
              </Typography>
              <Typography variant="body2" sx={{ color: "#484237" }}>
                Your files are broken into smaller chunks for secure storage and
                distribution.
              </Typography>
            </Card>
          </Grid>

          {/* Feature 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, textAlign: "center", p: 3, backgroundColor: "#B2A599" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Node Distribution
              </Typography>
              <Typography variant="body2" sx={{ color: "#484237" }}>
                Files are stored across multiple nodes, ensuring reliability and
                redundancy.
              </Typography>
            </Card>
          </Grid>

          {/* Feature 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ boxShadow: 3, textAlign: "center", p: 3, backgroundColor: "#B2A599" }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                IPFS Hashing
              </Typography>
              <Typography variant="body2" sx={{ color: "#484237" }}>
                Unique IPFS hashes ensure your data is tamper-proof and secure.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardPage;
