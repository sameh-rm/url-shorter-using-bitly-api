from app.shorty.settings import DOMAIN
from app.shorty.utils import bitly_shorten
from app.shorty.local_api.api import insert_url
from flask_restplus import Resource, fields, Namespace
from flask import request, abort
from app.shorty.models import mongo

api = Namespace("bitly", description="bitly shortener related operations",
                )
url_shortener_model = api.model("BitlyShortener", {
    "to_url": fields.String("https://www.google.com/")
})


@api.route("/")
class BitlyShortener(Resource):
    @api.expect(url_shortener_model)
    def post(self):
        jdata = request.json
        to_url = None

        if not "to_url" in jdata.keys():
            abort(400, "Invalid request to_url is required")
        else:
            to_url = jdata["to_url"]
            existed = mongo.db.urls.find_one({"to_url": to_url})
            if existed:
                return {"from_url": existed["from_url"], "code": 302}
            else:
                try:
                    res, code = bitly_shorten(to_url)
                    mongo.db.urls.insert(
                        {"to_url": to_url, "from_url": res["link"]})

                    return {
                        "from_url": res["link"]
                    }, code
                except KeyError:
                    abort(422, "UNPROCESSABLE")
