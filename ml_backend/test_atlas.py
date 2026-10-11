import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(override=True)

uri = os.getenv("MONGODB_URI")

if not uri:
    raise SystemExit("MONGODB_URI is missing from .env")

client = MongoClient(uri, serverSelectionTimeoutMS=10000)

try:
    client.admin.command("ping")
    print("SUCCESS: Connected to MongoDB Atlas!")
except Exception as exc:
    print("Connection failed:", exc)
finally:
    client.close()