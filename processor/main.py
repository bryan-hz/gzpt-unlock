import http
import json
import random
import time

from flask import Flask, request

from constants import SCREEN_HEIGHT, SCREEN_WIDTH

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


def handle_update_device_settings(data: dict):
    new_settings = dict()
    for key, value in data.items():
        if not key in device_settings:
            print("[ERROR] Key error, settings remain unchanged.")
            return False, key
        else:
            new_settings[key] = value
    device_settings.update(new_settings)
    print("[INFO] Update Successful!")
    return True, None


@app.route("/settings", methods=["GET", "PUT"])
def settingsAPI():
    data = json.loads(request.get_data())
    if request.method == "PUT":
        update_success, err = handle_update_device_settings(data)
        print("[INFO] Current device settings: ", device_settings)
        if not update_success:
            return ('Invalid Setting Key \"{}\"'.format(err),
                    http.HTTPStatus.BAD_REQUEST)
        else:
            return ('', http.HTTPStatus.OK)


def handle_post_user_inputs(x: int, y: int):
    if len(user_inputs) > 5000:
        user_inputs.pop(0)
        user_inputs.append((x, y))


@app.route("/inputs", methods=["POST"])
def user_inputsAPI():
    data = json.loads(request.get_data())
    if len(data) > 2:
        return ("Too many parameters",
                http.HTTPStatus.BAD_REQUEST)
    x = y = None
    for key in ["x", "y"]:
        try:
            key = data[key]
        except:
            return ('Missing parameter \"{}\"'.format(key),
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
