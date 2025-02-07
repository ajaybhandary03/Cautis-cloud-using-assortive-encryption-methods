from stegano import lsb

CARRIER_IMAGE_PATH = "storage/carrier_image.png"

try:
    metadata = lsb.reveal(CARRIER_IMAGE_PATH)
    print("Extracted Metadata:", metadata)
except Exception as e:
    print("Error:", str(e))
