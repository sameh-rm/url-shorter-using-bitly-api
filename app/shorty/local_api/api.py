from random import choice
from flask import request, abort
from flask_restplus import Resource, fields, Namespace
from app.shorty.extensions import mongo
from app.shorty.settings import SEED, URL_LEN, DOMAIN
from app.shorty.utils import validate_url


api = Namespace("local", description="local shortner related operations",
                )
url_shortner_model = api.model("URLShortener", {
    "to_url": fields.Url("https://www.google.com/")
})


def insert_url(to_url):
    urls = mongo.db.urls

    if not validate_url(to_url):
        abort(422, "to_url is not a valid url")
    existed = urls.find_one({"to_url": to_url})
    if existed:
        if "bitly" in existed["from_url"]:
            return {"from_url": existed["from_url"], "code": 302}
        return {"from_url": DOMAIN + existed["from_url"], "code": 302}
    else:
        from_url = ''.join([choice(SEED) for i in range(URL_LEN)])
        # if the generated url exists generate a new one
        while urls.find_one({"from_url": from_url}):
            from_url = ''.join([choice(SEED) for i in range(URL_LEN)])
        # insert into urls collection
        urls.insert({"to_url": to_url, "from_url": from_url})
    return {"from_url": DOMAIN + from_url, "code": 201}


@api.route("/")
class URLShortener(Resource):
    @api.expect(url_shortner_model)
    def post(self):
        jdata = request.json
        to_url = None

        if not "to_url" in jdata.keys():
            abort(400, "Invalid request to_url is required")
        else:
            to_url = jdata["to_url"]

        res = insert_url(to_url)
        return {
            "from_url": res["from_url"]
        }, res["code"]
