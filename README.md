SecureCloud: A cautis File Storage System
SecureCloud is a cautis file storage system that allows users to securely upload, encrypt, and store their files. The system uses a node-splitting mechanism to distribute files across a simulated decentralized network, leveraging IPFS (InterPlanetary File System) for efficient and distributed storage.

Features
File Upload: Users can upload files through a user-friendly interface.
Encryption: Uploaded files are encrypted for secure storage.
Node Splitting: Files are split into chunks, mimicking decentralized storage.
IPFS Integration: File chunks are stored and retrieved from IPFS for efficient and distributed access.
File Retrieval: Users can retrieve files using a unique file hash, ensuring secure access.
Requirements
To run this project, you need the following installed on your system:

Python (version 3.8 or later)
Node.js (for IPFS and frontend)
Flask (Python backend framework)
IPFS Daemon (IPFS CLI or API setup)
Setup Instructions
Follow these steps to set up and run the project on your local machine:

Step 1: Clone the Repository
Clone the project repository from the zip file

Step 2: Install Backend Dependencies
Ensure you have Python installed. Then, install the required Python packages:

Step 3: Install IPFS
Download and install IPFS from the official website: IPFS Installation.
Initialize IPFS on your system:
bash
Copy code
ipfs init
Start the IPFS daemon:
bash
Copy code
ipfs daemon
Step 4: Configure MongoDB

Step 5: Run the Backend
Run the Python Flask backend server:

bash
Copy code
python app.py
This will start the backend server at http://127.0.0.1:5000.

Step 6: Run the Frontend
The frontend is built with React. Navigate to the frontend directory and install dependencies:

bash
Copy code
cd frontend
npm install
npm start
This will start the frontend at http://localhost:3000.

How It Works
User Authentication:

Users can register and log in to the system.
MongoDB stores user credentials and session data.
File Upload:

Users upload files through the web interface.
Files are encrypted using AES-256 encryption to ensure data security.
Node Splitting:

Encrypted files are split into smaller chunks.
These chunks simulate decentralized storage by being processed independently.
IPFS Storage:

Each chunk is stored on IPFS, and a unique hash is generated.
The metadata, including hashes, is saved in MongoDB.
File Retrieval:

Users can retrieve files using the unique file hash.
The system fetches chunks from IPFS, decrypts, and reassembles the file.

Usage
Upload Files: Navigate to the "Upload" page, select a file, and upload it.
Download Files: Go to the "Download" page, enter the file hash, and retrieve your file.
Monitor Storage: Use IPFS to track and manage the distributed file chunks.
Future Enhancements
Implement user-specific IPFS nodes for greater decentralization.
Add more encryption algorithms for enhanced security.
Improve the UI for better user experience.
