from werkzeug.exceptions import HTTPException
from flask import (
    Flask,  request, abort, redirect
)
from flask_cors import CORS
from .users.api import api as users_ns
from .local_api.api import api as local_api_ns
from .bitly.api import api as bitly_ns
from .extensions import (
    mongo,
    api
)


def create_app(db_uri=None, config_file="settings.py"):
    app = Flask(__name__)
    app.config.from_pyfile(config_file)
    CORS(app, resources={r"/*": {"origins": "*"}})

    # INIT Extensions
    if db_uri:
        # use a custom uri
        mongo.init_app(app, db_uri)
    else:
        # use the default MONGO_URI from settings.py
        mongo.init_app(app)
    api.init_app(app)

    # NameSpaces
    api.add_namespace(users_ns, "/api/users")
    api.add_namespace(bitly_ns, "/api/bitly")
    api.add_namespace(local_api_ns, "/api/local")

    # error Handler

    # adding cors headers
    @app.after_request
    def after_request(response):
        response.headers.add(
            "Access-Control-Allow-Headers",
            "Content-Type,Authorization,true"
        )
        response.headers.add(
            "Access-Control-Allow-Methods",
            "GET,POST,PUT,PATCH,DELETE,OPTIONS"
        )
        return response

    @app.route("/<path:path>")
    def get_local_shortned_urls(path):
        urls_collection = mongo.db.urls
        shortned_url = urls_collection.find_one({"from_url": path})
        if not shortned_url:
            abort(404, "URL NOT FOUND")
        else:
            # we might render a redirect template
            return redirect(shortned_url["to_url"], 302)

    @app.errorhandler(HTTPException)
    def handle_bad_request(e):

        return {
            "message": e.description,
            "code": e.code
        }, e.code

    return app
