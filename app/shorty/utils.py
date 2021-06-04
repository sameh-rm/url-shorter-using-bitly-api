import datetime
import jwt
import requests.exceptions
from requests.models import PreparedRequest
from functools import wraps
from flask import request
import json
from app.shorty.models import User
from app.shorty.settings import SECRET_KEY

algorithm = "HS256"


def validate_url(url):
    prepared_request = PreparedRequest()
    try:
        prepared_request.prepare_url(url, None)
        return True
    except requests.exceptions.MissingSchema as e:
        return False


def generate_token(user: User, exp_hours: int = 12):
    return jwt.encode({"user": user.username, "exp": datetime.datetime.utcnow(
    ) + datetime.timedelta(hours=exp_hours)}, SECRET_KEY, algorithm=algorithm)


def decode_token(token):
    return jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=[algorithm])


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("authorization")
        if not token:
            return {"message": "Token is missing", "success": False}, 401
        try:
            # expected (Bearer Token)
            jwt.decode(token.split(" ")[1], SECRET_KEY, algorithms=[algorithm])
        except Exception as e:
            return {"message": "Token is invalid or expired", "success": False}, 403
        return f(*args, **kwargs)
    return decorated


def bitly_shorten(to_url):
    import requests
    headers = {
        'Authorization': 'Bearer c0a816258e5e36f9558185f8c9b5c76a3aff1369',
        'Content-Type': 'application/json',
    }

    data = {"long_url": to_url, "domain": "bit.ly"}

    response = requests.post(
        'https://api-ssl.bitly.com/v4/shorten', headers=headers, data=json.dumps(data))
    return response.json(), response.status_code
