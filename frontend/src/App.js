import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import FileUploadPage from "./pages/FileUploadPage";
import DownloadPage from "./pages/DownloadPage";
import VerificationPage from "./pages/VerificationPage"; // Import the new verification page

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerificationPage />} /> {/* Add verification page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/upload" element={<FileUploadPage />} />
          <Route path="/download" element={<DownloadPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
