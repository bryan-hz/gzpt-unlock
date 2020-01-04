import http
import json
import random
import time

from flask import Flask, request

from constants import SCREEN_HEIGHT, SCREEN_WIDTH
from messages import (INVALID_SETTING_KEY, MISSING_PARAMETER,
                      TOO_MANY_PARAMETERS)

app = Flask(__name__)

device_settings = {
    SCREEN_WIDTH: None,
    SCREEN_HEIGHT: None
}

buffer_size = 5000
user_inputs = []

results = list()
historical_inputs = list()


@app.route("/")
def homeAPI():
    return "Welcome Processing Server!"


def handle_update_device_settings(settings: dict):
    new_settings = dict()
    for key, value in settings.items():
        if not key in device_settings:
            print("[ERROR] Key error, settings remain unchanged.")
            return False, key
        else:
            new_settings[key] = value
    device_settings.update(new_settings)
    print("[INFO] Update Successful!")
    return True, None


def handle_get_device_settings(keys: list) -> dict:
    settings = dict()
    for key in keys:
        if not key in device_settings:
            return False, key
        else:
            settings[key] = device_settings[key]
    return True, settings


@app.route("/settings", methods=["GET", "PUT"])
def settingsAPI():
    if request.method == "PUT":
        data = json.loads(request.get_data())
        update_success, err = handle_update_device_settings(data)
        print("[INFO] Current device settings: ", device_settings)
        if not update_success:
            return (INVALID_SETTING_KEY.format(err),
                    http.HTTPStatus.BAD_REQUEST)
        else:
            return ('', http.HTTPStatus.OK)
    elif request.method == "GET":
        keys = request.args.getlist("keys")
        fetch_success, content = handle_get_device_settings(keys)
        if fetch_success:
            return (content, http.HTTPStatus.OK)
        else:
            return (INVALID_SETTING_KEY.format(content),
                    http.HTTPStatus.BAD_REQUEST)
    else:
        # Should not happen
        return ('', http.HTTPStatus.METHOD_NOT_ALLOWED)


def handle_post_user_inputs(x: int, y: int):
    if len(user_inputs) > 5000:
        user_inputs.pop(0)
        user_inputs.append((x, y))


@app.route("/inputs", methods=["POST"])
def user_inputsAPI():
    data = json.loads(request.get_data())
    if len(data) > 2:
        return (TOO_MANY_PARAMETERS,
                http.HTTPStatus.BAD_REQUEST)
    x = y = None
    for key in ["x", "y"]:
        try:
            key = data[key]
        except:
            return (MISSING_PARAMETER.format(key),
                    http.HTTPStatus.BAD_REQUEST)
    handle_post_user_inputs(x, y)
    return ('', http.HTTPStatus.CREATED)


def handle_get_authentication_results():
    """
    Validate and Return results by passing user inputs into model
    """
    return {
        "validate_success": random.choice([True, False]),
        "last_input": random.choice([None, *list(range(1, 9))])
    }


@app.route("/results", methods=["GET"])
def authentication_resultsAPI():
    return handle_get_authentication_results()


# @app.route("/results", methods=["GET", "POST"])
# def authentication_resultsAPI():
#     global results, historical_inputs
#     if request.method == "GET":
#        try:
#           data = json.dumps(historical_inputs[-1])
#        except:
#           data = None
#     elif request.method == "POST":
#         raw_data = request.get_data()
#         data = json.loads(raw_data).get("data")
#         historical_inputs.extend(data)
#         if len(historical_inputs) > 1000:
#             print('long')
#             historical_inputs.pop(0)
#         print(historical_inputs[-1], len(historical_inputs))
#         return ('', http.HTTPStatus.OK)
#     else:
#         return ('', http.HTTPStatus.BAD_REQUEST)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
