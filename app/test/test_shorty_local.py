
from app.shorty import create_app
from flask import json
import unittest
import jwt
from app.shorty.models import User
from app.shorty.extensions import mongo
from app.shorty.settings import MONGO_TEST_URI
from app.shorty.utils import generate_token

db = None


class ShortyLocalTestCase(unittest.TestCase):
    def setUp(self):
        global db
        self.app = create_app(db_uri=MONGO_TEST_URI)
        self.client = self.app.test_client
        self.db = mongo.db
        db = self.db

    def tearDownClass():
        db.drop_collection("urls")

    def test__shorten_url_201(self):
        global from_url
        res = self.client().post(
            "/api/local/",
            json={"to_url": "https://www.google.com/"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 201)
        self.assertTrue(data["from_url"])

    def test__shorten_url_400(self):

        res = self.client().post(
            "/api/local/",
            json={})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 400)
        self.assertEqual(data["message"], "Invalid request to_url is required")

    def test__shorten_url_302(self):
        self.headers = {

        }
        res = self.client().post(
            "/api/local/",
            json={"to_url": "https://www.google.com/"},)
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 302)
        self.assertTrue(data["from_url"])

    def test__shorten_url_422(self):
        res = self.client().post(
            "/api/local/",
            json={"to_url": "google"})
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 422)
        self.assertEqual(data["message"], "to_url is not a valid url")

    # this endpoint is redirecting to its destination
    # def test_get_local_shortned_urls_302(self):
    #     global from_url
    #     print(from_url)
    #     res = self.client().get(f"/{from_url}")
    #     print(res.data)
    #     data = json.loads(res.data)
    #     self.assertEqual(res.status_code, 302)
    #     self.assertTrue(data["from_url"])

    def test_get_local_shortned_urls_404(self):
        res = self.client().get("/notfound")
        data = json.loads(res.data)
        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["message"], "URL NOT FOUND")
