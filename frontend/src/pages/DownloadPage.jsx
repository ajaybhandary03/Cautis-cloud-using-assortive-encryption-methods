import React, { useState } from "react";
import { Box, Button, Typography, TextField } from "@mui/material";
import axios from "axios";

const DownloadPage = () => {
  const [filename, setFilename] = useState("");
  const [message, setMessage] = useState("");

  const handleDownload = async () => {
    if (!filename) {
      setMessage("Please enter a filename.");
      return;
    }
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/download/${filename}`,
        {
          responseType: "blob", // For downloading files
        }
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("Download started.");
    } catch (error) {
      setMessage("File download failed. Ensure the filename is correct/all nodes are present.");
    }
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Download a File
      </Typography>
      <TextField
        label="Filename"
        variant="outlined"
        onChange={(e) => setFilename(e.target.value)}
        style={{ marginBottom: "20px", width: "300px" }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleDownload}>
        Download
      </Button>
      {message && (
        <Typography color="textSecondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default DownloadPage;
