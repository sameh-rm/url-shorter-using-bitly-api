import os
from os import getenv
from re import DEBUG
from string import ascii_letters, digits
from dotenv import load_dotenv

load_dotenv()


MONGO_URI = getenv("MONGO_URI")
MONGO_TEST_URI = getenv("MONGO_TEST_URI")
SECRET_KEY = getenv("SECRET_KEY")
SHA_METHOD = getenv("SHA_METHOD")
ACCESS_TOKEN = getenv("ACCESS_TOKEN")
DOMAIN = getenv("DOMAIN")
if not DOMAIN.endswith("/"):
    DOMAIN += "/"

DEBUG = False

URL_LEN = 8
SEED = ascii_letters + digits
