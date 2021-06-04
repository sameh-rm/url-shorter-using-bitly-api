from flask.json import jsonify
from werkzeug.exceptions import abort
from .extensions import mongo
from werkzeug.security import generate_password_hash


class User:

    def __init__(self, name, email, username, password, id=None, urls=[]):
        self.id = id
        if name and email and username and password:
            self.name = name
            self.email = email
            self.username = username
            self.password = password
            self.urls = urls
        else:
            abort(422, "invalid user format")

    @classmethod
    def from_doc(cls, document):
        return User(
            id=document["_id"],
            name=document["name"],
            username=document["username"],
            password=document["password"],
            email=document["email"],
            urls=document["urls"],
        )

    def insert(self):
        existed_user = mongo.db.users.find_one(
            {"$or": [{"username": self.username}, {"email": self.email}]})
        if not existed_user:
            user = mongo.db.users.insert({
                "name": self.name,
                "email": self.email,
                "username": self.username,
                "password": generate_password_hash(self.password, method="sha256"),
                "urls": []
            })
            return user
        else:
            abort(409, "username or email is taken try another one")

    def update(self):
        existed_user = mongo.db.users.find_one_or_404({"_id": self.id})
        if existed_user:
            user = mongo.db.users.update({"_id": self.id}, {
                "name": self.name,
                "email": self.email,
                "username": self.username,
            })
            return user

    def add_url(self, to_url, from_url):
        existed_user = mongo.db.users.find_one_or_404({"_id": self.id})
        url_exists = mongo.db.users.find(
            {"_id": self.id, "urls": {"$elemMatch": {"to_url": to_url}}})
        if existed_user and url_exists.count() == 0:
            user = mongo.db.users.update(
                {"_id": self.id},
                {
                    "$push": {
                        "urls": {
                            "to_url": to_url,
                            "from_url": from_url
                        }}}
            )
            return user

    def delete(self):
        existed_user = mongo.db.users.find_one_or_404({"_id": self._id})
        if existed_user:
            user = mongo.db.users.remove()
            return user
