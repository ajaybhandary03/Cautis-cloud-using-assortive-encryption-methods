import React, { useState } from "react";
import { Box, TextField, Button, Typography, CircularProgress, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerificationPage = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    const email = localStorage.getItem("email");
    if (!email) {
      setError("Email not found. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/verify-otp", { email, otp });
      setSuccessMessage(response.data.message);

      // Redirect to home page after successful verification
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "#f4f6f8",
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          padding: 4,
          borderRadius: 2,
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" gutterBottom align="center" color="primary">
          OTP Verification
        </Typography>
        <TextField
          label="Enter OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
          onClick={handleVerify}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Verify"}
        </Button>
        {error && (
          <Typography color="error" mt={2} align="center">
            {error}
          </Typography>
        )}
      </Box>
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: "100%" }}>
          {successMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VerificationPage;
