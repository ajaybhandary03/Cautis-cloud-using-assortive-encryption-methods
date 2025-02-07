import React, { useState } from "react";
import { Box, Button, Typography, Input } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FileUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // React Router's navigation hook

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("File upload failed.");
    }
  };

  const goToDownloadPage = () => {
    navigate("/download"); // Redirect to the Download page
  };

  return (
    <Box textAlign="center" mt={5}>
      <Typography variant="h4" gutterBottom>
        Upload a File
      </Typography>
      <Input type="file" onChange={handleFileChange} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        style={{ marginLeft: "10px" }}
      >
        Upload
      </Button>
      {message && (
        <Typography color="textSecondary" mt={2}>
          {message}
        </Typography>
      )}
      <Box mt={4}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={goToDownloadPage} // Redirect to the Download page
        >
          Go to Download Page
        </Button>
      </Box>
    </Box>
  );
};

export default FileUploadPage;
