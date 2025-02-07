import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./main.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    console.log("Navigating to login..."); // Debug log
    navigate("/login");
  };

  return (
    <Box>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          backgroundImage: "url('./images/blue-purpos background.jpg')", // Ensure correct path
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            fontFamily: "'Syne', sans-serif",
            fontSize: "3.5rem",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
            lineHeight: "1.2",
          }}
        >
          Secure Your Data with Decentralized Storage
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            mt: 2,
            fontSize: "1.2rem",
            fontWeight: "400",
            textShadow: "1px 1px 6px rgba(0, 0, 0, 0.5)",
            lineHeight: "1.6",
            fontFamily: "'Syne', sans-serif",
          }}
        >
          CautisCloud, a cautis approach to cloud security
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            onClick={handleLoginClick}
            variant="contained"
            sx={{
              backgroundColor: "#fcb900",
              color: "#000",
              fontSize: "1.2rem",
              fontWeight: "700",
              padding: "12px 24px",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(252, 185, 0, 0.5)",
              textTransform: "none",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#ffcf50",
                boxShadow: "0px 6px 15px rgba(252, 185, 0, 0.7)",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;
