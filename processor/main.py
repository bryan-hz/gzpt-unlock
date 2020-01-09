import http
import json
import random
import time

from flask import Flask, request

from constants import SCREEN_HEIGHT, SCREEN_WIDTH, INPUT_ZONES
from messages import (INVALID_SETTING_KEY, MISSING_PARAMETER,
                      TOO_MANY_PARAMETERS)
from model import GMM_Classifier

app = Flask(__name__)

device_settings = {
    SCREEN_WIDTH: None,
    SCREEN_HEIGHT: None,
    INPUT_ZONES: None
}

MAX_BUFFER_SIZE = 30    # max length of valid user input
user_inputs = []        # user input list

historical_inputs = list()

classifier = None

@app.route("/")
def homeAPI():
    return "Welcome Processing Server!"


####################################
##    Settings Related Requests   ##
####################################
@app.route("/settings", methods=["GET", "PUT"])
def settingsAPI():
    """Get or Set device settings
    
    > GET method expected queries with "keys" as keyword
    > PUT method expected json payload with structure like
        {
            "screen_width": 1280,
            "screen_height": 720
        }
    """
    if request.method == "PUT":
        data = json.loads(request.get_data())
        update_success, err = handle_update_device_settings(data)
        app.logger.info("Current device settings:\n{}".format(device_settings))
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


def handle_update_device_settings(settings: dict):
    """Update existing settings
    If there exists key that does not belongs to device settings,
    no changed will be made
    
    This function will trigger update on classifier as well

    Parameter
    ---------
    settings: dict
    dictionary of settings to be updated

    Returns
    -------
    bool, str or None
    on success, True and None will be returned;
    on failure, False and the key causing the failure will be returned
    """
    new_settings = dict()
    for key, value in settings.items():
        if not key in device_settings:
            app.logger.error("Key error, settings remain unchanged.")
            return False, key
        else:
            new_settings[key] = value
    device_settings.update(new_settings)
    classes = {}
    for k, (pos, _) in device_settings[INPUT_ZONES].items():
        classes[k] = pos
    classifier = GMM_Classifier(classes)
    app.logger.info("Update Successful!")
    return True, None


def handle_get_device_settings(keys: list) -> (bool, dict):
    """Get settings of given keys

    Parameter
    ----------
    keys: list
    list of setting keys


    Returns
    -------
    bool, dict
    on success, it will return True and expected settings;
    on failure, it will return False and the key causing the failure.
    """
    settings = dict()
    for key in keys:
        if not key in device_settings:
            return False, key
        else:
            settings[key] = device_settings[key]
    return True, settings


########################################
##    User Inputs Related Requests    ##
########################################
@app.route("/inputs", methods=["POST"])
def user_inputsAPI():
    """API for storing new user input
    payload is json style of shape:\n
    {
        "x": int,
        "y": int
    }

    > if parameters are more than "x" and "y",
      server will return Bad Request
    > if parameters contains key other than "x" or "y",
      server will return Bad Request
    
    > if user input is successfully stored
      server will return Created
    """
    data = json.loads(request.get_data())
    if len(data) > 2:
        return (TOO_MANY_PARAMETERS,
                http.HTTPStatus.BAD_REQUEST)

    x = y = None
    try:
        x = data["x"]
    except:
        return (MISSING_PARAMETER.format("x"),
                http.HTTPStatus.BAD_REQUEST)
    try:
        y = data["y"]
    except:
        return (MISSING_PARAMETER.format("y"),
                http.HTTPStatus.BAD_REQUEST)

    handle_post_user_inputs(x, y)
    return ('', http.HTTPStatus.CREATED)


def handle_post_user_inputs(x: int, y: int):
    """Store received user input

    Parameters
    ----------
    x: int
    x of the position

    y: int
    y of the position

    Return
    ------
    True
    temporarily always return successful 
    """
    if len(user_inputs) > MAX_BUFFER_SIZE:
        user_inputs.pop(0)
        centers, covs = classifier.classify_inputs(user_inputs, {})
        app.logger.info("classify result:\n{}".format(centers, covs))

    user_inputs.append([x, y])

    return True


####################################
##    Results Related Requests    ##
####################################
@app.route("/results", methods=["GET"])
def authentication_resultsAPI():
    """Get Most Recent Validation Result
    
    Returns
    -------
    Response
    {
        "content": {
            "validate_success": bool,
            "last_input": int or None
        }
    }
    """
    return handle_get_authentication_results()


def handle_get_authentication_results():
    """
    Validate and Return results by passing user inputs into model
    """
    #TODO
    return {
        "validate_success": random.choice([True, False]),
        "last_input": random.choice([None, *list(range(1, 9))])
    }

# @app.route("/results", methods=["GET", "POST"])
# def authentication_resultsAPI():
#     global historical_inputs
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
