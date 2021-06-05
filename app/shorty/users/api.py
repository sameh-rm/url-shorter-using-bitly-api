
from app.shorty.local_api.api import insert_url
from flask import abort
from flask.globals import request
from flask_restplus import Resource, fields, Namespace
from app.shorty.extensions import mongo
from werkzeug.security import check_password_hash
from app.shorty.utils import bitly_shorten, decode_token, generate_token, token_required
from app.shorty.models import User


authorizations = {
    'authorization': {
        'type': 'apiKey',
        'in': 'header',
        'name': 'authorization',
        "description": "Bearer {Token}"
    }
}
api = Namespace("users", description="users related operations",
                authorizations=authorizations)

register_model = api.model("Register",
                           {
                               'name': fields.String(default="Joe Doe"),
                               'email': fields.String("Joe@mail.com"),
                               'username': fields.String("Joe"),
                               'password': fields.String("password"),
                           })

login_model = api.model("Login",
                        {
                            'username': fields.String("Joe"),
                            'password': fields.String("password"),
                        })

user_url = api.model("AddUserURl", {
    "to_url": fields.Url("https://www.google.com/")
})

responses = {
    200: "Success",
    400: "username and password are required to login",
    404: "login failed check your username and password and try again",
    422: "invalid password"
}


@api.route("/login", methods=["POST"])
class Login(Resource):
    @api.expect(login_model)
    @api.doc(responses=responses)
    def post(self):
        try:
            body = api.payload
            username = body["username"]
            password = body["password"]
            if not username or not password:
                abort(400, "username and password are required to login")

            # check if the sent username is an existed username or email
            user_exists = mongo.db.users.find_one(
                {"$or": [{"username": username}, {"email": username}]})

            if user_exists:
                user = User.from_doc(user_exists)
            else:
                abort(404, "login failed check your username and password and try again")

            if check_password_hash(user.password, password):
                token = generate_token(user)
                return {"token": token,
                        "username": username}, 200
            else:
                abort(422, "invalid password")
        except KeyError:
            abort(400, "username and password are required to login")


@api.route("/", methods=["POST"])
class Register(Resource):
    @api.expect(register_model)
    @api.doc(responses={201: "Success",
                        401: "Token is missing",
                        403: "Token is invalid or expired",
                        409: "Conflict Error Username or email already used",
                        422: "invalid user format"})
    def post(self):
        try:
            body = api.payload
            user = User(name=body["name"], username=body["username"],
                        email=body["email"], password=body["password"])
            user.insert()
            token = generate_token(user)
            res = {"token": token, "username": user.username,
                   "message": "user has been created"}, 201
            return res

        except KeyError:
            abort(422, "invalid user format")


@api.route("/urls", methods=["GET"])
class UserUrls(Resource):
    @api.doc(security="authorization",
             responses={201: "Success",
                        401: "Token is missing",
                        403: "Token is invalid or expired",
                        })
    @token_required
    def get(self):
        try:
            username = decode_token(
                request.headers["authorization"])["user"]
            user_doc = mongo.db.users.find_one({"$or": [{"username": username},
                                                        {"email": username}]})
            return user_doc["urls"]
        except KeyError:
            abort(404, "this users have no urls")


@api.route("/urls/local", methods=["POST"])
class AddUserLocalURl(Resource):
    @api.expect(user_url)
    @api.doc(security="authorization",
             responses={201: "Success",
                        401: "Token is missing",
                        403: "Token is invalid or expired",
                        422: "invalid user format",
                        })
    @token_required
    def post(self):
        try:
            to_url = api.payload["to_url"]
            username = decode_token(
                request.headers["authorization"])["user"]
            user_doc = mongo.db.users.find_one({"$or": [{"username": username},
                                                        {"email": username}]})
            if user_doc:
                user = User.from_doc(user_doc)
                res = insert_url(to_url)

                user.add_url(to_url, res["from_url"])
                return {
                    "from_url": res["from_url"]
                }, res["code"]
            else:
                abort(404, "USER NOT FOUND")
        except KeyError:
            abort(422, "invalid user format")


@api.route("/urls/bitly")
class BitlyShortener(Resource):
    @api.expect(user_url)
    @api.doc(security="authorization",
             responses={201: "Success",
                        401: "Token is missing",
                        403: "Token is invalid or expired",
                        422: "invalid user format",
                        })
    @token_required
    def post(self):
        jdata = request.json
        to_url = None

        if not "to_url" in jdata.keys():
            abort(400, "Invalid request to_url is required")
        else:
            to_url = jdata["to_url"]
            username = decode_token(
                request.headers["authorization"])["user"]
            user_doc = mongo.db.users.find_one({"$or": [{"username": username},
                                                        {"email": username}]})
            res, code = bitly_shorten(to_url)
            if user_doc:
                user = User.from_doc(user_doc)
                mongo.db.urls.insert(
                    {"to_url": to_url, "from_url": res["link"]})
                user.add_url(to_url, res["link"])
        return {
            "from_url": res["link"]
        }, code
