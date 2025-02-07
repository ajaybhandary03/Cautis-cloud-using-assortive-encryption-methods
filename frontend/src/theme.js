import React from "react";
import { Link } from "react-router-dom";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#f50057" },
  },
  typography: {
    fontFamily: "'Roboto', 'Arial', sans-serif",
  },
});

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/upload">Upload File</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/download">Download File</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;





