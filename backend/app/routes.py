from flask import Blueprint, jsonify
from flask_cors import CORS
import urllib.request
import json
from .middleware import log_request_middleware
from .config import API_CONFIG

main_bp = Blueprint("main", __name__)
CORS(main_bp)


@main_bp.route("/")
@log_request_middleware()
def home():
    return jsonify(message="Hello, World!")


@main_bp.route("/health")
@log_request_middleware()
def health():
    return jsonify(status="healthy")


@main_bp.route("/stations")
@log_request_middleware()
def get_stations():
    try:
        with urllib.request.urlopen(
            API_CONFIG["STATION_STATUS_URL"], timeout=10
        ) as response:
            data = json.loads(response.read())
            return jsonify(data)
    except urllib.error.URLError as e:
        return jsonify(error=str(e)), 500


@main_bp.route("/stations/<station_id>")
@log_request_middleware()
def get_station_detail(station_id):
    try:
        with urllib.request.urlopen(
            API_CONFIG["STATION_STATUS_URL"], timeout=10
        ) as response:
            data = json.loads(response.read())
            station = next(
                (s for s in data["data"]["stations"] if s["station_id"] == station_id),
                None,
            )
            if station is None:
                return jsonify(error="Station not found"), 404
            return jsonify(station)
    except urllib.error.URLError as e:
        return jsonify(error=str(e)), 500


def register_routes(app):
    app.register_blueprint(main_bp)
