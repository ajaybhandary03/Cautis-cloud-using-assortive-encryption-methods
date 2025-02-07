# CautisCloud - Secure Distributed Cloud Storage

## Overview

CautisCloud is a secure and distributed cloud storage solution that enhances data security using metadata-based steganography and node-based file distribution. The project ensures safe storage and retrieval of files by embedding metadata into carrier images and distributing encrypted file chunks across different storage nodes.

## Features

- **User Authentication**: Secure login and registration system.
- **File Upload & Download**: Users can upload and download files seamlessly.
- **Node-Based Distribution**: Files are split into chunks and distributed across different storage nodes.
- **Metadata Steganography**: File metadata is embedded into images to enhance security.
- **Secure Encryption**: File chunks and metadata are encrypted for additional protection.
- **Professional UI**: Google Cloud-inspired user interface.

## Prerequisites

Before installing the project, ensure you have the following installed:

- **Python 3.10+**
- **MongoDB** (Ensure MongoDB is running locally)
- **Node.js & npm** (For frontend dependencies)
- **Git** (For version control)

## Installation

### **1. Clone the Repository**

```sh
 git clone https://github.com/ajaybhandary03/Cautis-cloud-using-assortive-encryption-methods.git
 cd Cautis-cloud-using-assortive-encryption-methods
```

### **2. Backend Setup**

```sh
 cd backend
 python -m venv venv
 source venv/bin/activate  # On Windows, use: venv\Scripts\activate
 pip install -r requirements.txt
```

### **3. Frontend Setup**

```sh
 cd ../frontend
 npm install
```

## Running the Application

### **1. Start the Backend**

```sh
 cd backend
 flask run
```

### **2. Start the Frontend**

```sh
 cd frontend
 npm start
```

## Usage

1. **Register/Login** to access the platform.
2. **Upload a File**: The file gets split, encrypted, and stored across distributed nodes.
3. **Download a File**: The metadata is extracted from the carrier image, and the file is reassembled for secure download.

## Future Enhancements

- **Improved UI & UX**
- **Advanced Encryption & Hashing Mechanisms**
- **Integration with Decentralized Storage Networks**
- **Multi-Factor Authentication for Enhanced Security**
- **Mobile Application Support**
