from flask import Flask, request, jsonify, send_file, Response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from cryptography.fernet import Fernet
from stegano import lsb
from PIL import Image
import os
import json
import random
from mimetypes import guess_type

app = Flask(__name__)
CORS(app)

# Configuration
UPLOAD_FOLDER = "storage/encrypted_files"
NODE_FOLDERS = ["storage/node1", "storage/node2", "storage/node3"]
CHUNK_SIZE = 1024 * 1024  # 1 MB
KEY_FILE = "file_key.key"
IPFS_HASHES_FILE = "storage/ipfs_hashes.json"
USER_DATA_FILE = "storage/users.json"
CARRIER_IMAGE_PATH = "storage/carrier_image.png"

# Ensure required directories exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
for folder in NODE_FOLDERS:
    os.makedirs(folder, exist_ok=True)
os.makedirs("storage", exist_ok=True)

# Generate or load encryption key
if not os.path.exists(KEY_FILE):
    with open(KEY_FILE, "wb") as key_file:
        key_file.write(Fernet.generate_key())

# Initialize IPFS hashes file
if not os.path.exists(IPFS_HASHES_FILE):
    with open(IPFS_HASHES_FILE, "w") as ipfs_file:
        json.dump({}, ipfs_file)

# Initialize user data file
if not os.path.exists(USER_DATA_FILE):
    with open(USER_DATA_FILE, "w") as user_file:
        json.dump({}, user_file)

# Ensure carrier image exists
if not os.path.exists(CARRIER_IMAGE_PATH):
    img = Image.new("RGB", (500, 500), color=(255, 255, 255))  # Create blank white image
    img.save(CARRIER_IMAGE_PATH)

def get_key():
    """Retrieve the encryption key."""
    with open(KEY_FILE, "rb") as key_file:
        return key_file.read()

def encrypt_data(data):
    """Encrypt raw data."""
    fernet = Fernet(get_key())
    return fernet.encrypt(data)

def decrypt_data(data):
    """Decrypt raw data."""
    fernet = Fernet(get_key())
    return fernet.decrypt(data)

def generate_otp():
    """Generate a 6-digit OTP."""
    return str(random.randint(100000, 999999))

@app.route("/register", methods=["POST"])
def register():
    """Register a new user."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required.", "status": "error"}), 400

    with open(USER_DATA_FILE, "r") as user_file:
        users = json.load(user_file)

    if email in users:
        return jsonify({"message": "Email already exists.", "status": "error"}), 400

    users[email] = {"password": password, "otp": None}
    with open(USER_DATA_FILE, "w") as user_file:
        json.dump(users, user_file, indent=4)

    return jsonify({"message": "User registered successfully.", "status": "success"}), 201

@app.route("/login", methods=["POST"])
def login():
    """Authenticate a user with OTP."""
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Email and password are required.", "status": "error"}), 400

    with open(USER_DATA_FILE, "r") as user_file:
        users = json.load(user_file)

    if email in users and users[email]["password"] == password:
        otp = generate_otp()
        users[email]["otp"] = otp
        with open(USER_DATA_FILE, "w") as user_file:
            json.dump(users, user_file, indent=4)

        return jsonify({"message": "OTP generated.", "otp": otp, "status": "success"}), 200
    return jsonify({"message": "Invalid email or password.", "status": "error"}), 401

@app.route("/verify-otp", methods=["POST"])
def verify_otp():
    """Verify the OTP."""
    data = request.json
    email = data.get("email")
    otp = data.get("otp")

    if not email or not otp:
        return jsonify({"message": "Email and OTP are required.", "status": "error"}), 400

    with open(USER_DATA_FILE, "r") as user_file:
        users = json.load(user_file)

    if email in users and users[email]["otp"] == otp:
        users[email]["otp"] = None  # Clear OTP after successful verification
        with open(USER_DATA_FILE, "w") as user_file:
            json.dump(users, user_file, indent=4)
        return jsonify({"message": "OTP verified successfully.", "status": "success"}), 200

    return jsonify({"message": "Invalid OTP.", "status": "error"}), 401

@app.route("/upload", methods=["POST"])
def upload_file():
    """Handle file upload, encryption, and chunking."""
    if "file" not in request.files:
        return jsonify({"message": "No file provided.", "status": "error"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"message": "No selected file.", "status": "error"}), 400

    filename = secure_filename(file.filename)
    encrypted_path = os.path.join(UPLOAD_FOLDER, f"{filename}.enc")

    file_data = file.read()
    encrypted_data = encrypt_data(file_data)
    with open(encrypted_path, "wb") as enc_file:
        enc_file.write(encrypted_data)

    ipfs_hashes = distribute_file(encrypted_path, filename)
    os.remove(encrypted_path)

    encode_metadata_in_image(ipfs_hashes)

    return jsonify({
        "message": "File uploaded, encrypted, and distributed.",
        "status": "success"
    }), 200

def distribute_file(file_path, filename):
    """Split encrypted file into chunks and distribute them to nodes."""
    chunk_index = 0
    ipfs_hashes = {}

    with open(file_path, "rb") as file:
        while chunk := file.read(CHUNK_SIZE):
            node_folder = NODE_FOLDERS[chunk_index % len(NODE_FOLDERS)]
            chunk_name = f"{filename}_chunk{chunk_index}"
            chunk_path = os.path.join(node_folder, chunk_name)

            with open(chunk_path, "wb") as chunk_file:
                chunk_file.write(chunk)

            ipfs_hashes[chunk_name] = {"node": node_folder}
            chunk_index += 1

    return ipfs_hashes

def encode_metadata_in_image(metadata):
    """Embed metadata into the carrier image."""
    metadata_str = json.dumps(metadata)
    lsb.hide(CARRIER_IMAGE_PATH, metadata_str).save(CARRIER_IMAGE_PATH)

def decode_metadata_from_image():
    """Retrieve metadata from the carrier image."""
    return json.loads(lsb.reveal(CARRIER_IMAGE_PATH))

@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    """Handle file download by reconstructing and decrypting."""
    try:
        ipfs_data = decode_metadata_from_image()
        print("Decoded Metadata:", ipfs_data)  # Debugging line

        file_chunks = {key: value for key, value in ipfs_data.items() if key.startswith(filename)}
        print("File Chunks Found:", file_chunks)  # Debugging line

        if not file_chunks:
            return jsonify({"message": "File not found.", "status": "error"}), 404

        sorted_chunks = sorted(file_chunks.keys(), key=lambda x: int(x.split("_chunk")[-1]))
        print("Sorted Chunks:", sorted_chunks)  # Debugging line

        encrypted_data = b''.join([open(os.path.join(file_chunks[chunk]["node"], chunk), "rb").read() for chunk in sorted_chunks])

        decrypted_data = decrypt_data(encrypted_data)

        mime_type, _ = guess_type(filename)

        return Response(
            decrypted_data,
            mimetype=mime_type or 'application/octet-stream',
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )
    except Exception as e:
        import traceback
        print("Error Traceback:", traceback.format_exc())  # Print detailed error
        return jsonify({"message": str(e), "status": "error"}), 500
