
from app.shorty import create_app
from flask import json
import unittest
import jwt
from app.shorty.models import User
from app.shorty.extensions import mongo, api
from app.shorty.settings import MONGO_TEST_URI
from app.shorty.utils import generate_token, decode_token

db = None
auth_token = None


class ShortyAuthTestCase(unittest.TestCase):
    def setUp(self):
        global db
        self.app = create_app(db_uri=MONGO_TEST_URI)
        self.client = self.app.test_client
        self.db = mongo.db
        db = self.db

    def tearDownClass():
        db.drop_collection("users")

    def test__create_user_201(self):

        res = self.client().post(
            "/api/users/",
            json={"username": "jhin",
                  "password": "createdUser",
                  "email": "jhin@mail.com",
                  "name": "jhin doe"})
        data = res.json
        self.assertEqual(res.status_code, 201)
        self.assertTrue(data["username"])
        self.assertTrue(data["token"])

    def test__create_user_422(self):

        res = self.client().post(
            "/api/users/",
            json={"username": "jhin", "password": "createdUser", "email": "jhin@mail.com"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["message"], "invalid user format")

    def test__create_user_409(self):

        res = self.client().post(
            "/api/users/",
            json={"username": "jhin", "password": "createdUser", "email": "jhin@mail.com", "name": "jhin doe"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 409)
        self.assertEqual(
            data["message"], "username or email is taken try another one")

    def test__login_200(self):
        global auth_token
        res = self.client().post(
            "/api/users/login",
            json={"username": "jhin", "password": "createdUser"})
        data = json.loads(res.data)
        auth_token = f"Bearer {data['token']}"
        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["username"])
        self.assertTrue(data["token"])

    def test__login_400(self):
        res = self.client().post(
            "/api/users/login",
            json={"username": "jhin"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["message"],
                         "username and password are required to login")

    def test__login_422(self):
        res = self.client().post(
            "/api/users/login",
            json={"username": "jhin", "password": "wrongpassword"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["message"],
                         "invalid password")

    def test_loged_user_add_url_201(self):
        global auth_token
        self.headers = {
            "authorization": auth_token
        }
        res = self.client().post(
            "/api/users/urls/local",
            json={"to_url": "https://www.gmail.com/"}, headers=self.headers)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 201)
        self.assertTrue(data["from_url"])

    def test_loged_user_add_url_403(self):
        global auth_token
        self.headers = {
            "authorization": "Bearer token"
        }
        res = self.client().post(
            "/api/users/urls/local",
            json={"to_url": "https://www.gmail.com/"}, headers=self.headers)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 403)
        self.assertEqual(data["message"],
                         "Token is invalid or expired")

    def test_loged_user_add_url_401(self):
        global auth_token

        res = self.client().post(
            "/api/users/urls/local",
            json={"to_url": "https://www.gmail.com/"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 401)
        self.assertEqual(
            data["message"],
            "Token is missing")
