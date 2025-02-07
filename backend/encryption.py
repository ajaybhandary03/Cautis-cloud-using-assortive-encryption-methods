from cryptography.fernet import Fernet

# Generate a key and save it (only once)
def generate_key():
    key = Fernet.generate_key()
    with open("file_key.key", "wb") as key_file:
        key_file.write(key)

# Load the key
def load_key():
    return open("file_key.key", "rb").read()

# Encrypt a file
def encrypt_file(file_path, output_path):
    key = load_key()
    fernet = Fernet(key)
    with open(file_path, "rb") as file:
        original = file.read()
    encrypted = fernet.encrypt(original)
    with open(output_path, "wb") as encrypted_file:
        encrypted_file.write(encrypted)

# Decrypt a file
def decrypt_file(encrypted_path, output_path):
    key = load_key()
    fernet = Fernet(key)
    with open(encrypted_path, "rb") as encrypted_file:
        encrypted = encrypted_file.read()
    decrypted = fernet.decrypt(encrypted)
    with open(output_path, "wb") as decrypted_file:
        decrypted_file.write(decrypted)

# Uncomment the following line to generate the key (only once)
# generate_key()
