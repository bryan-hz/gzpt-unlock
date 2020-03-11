import http
import logging

import requests
from flask import Flask, g, json, request

from processor import Processor

app = Flask(__name__)

root = logging.getLogger()
root.setLevel(logging.DEBUG)

processor = None


@app.route("/")
def homeAPI():
    return {'id': 'Gazepoint Authentication System Processor'}


#######################################
##    Calibration Related Requests   ##
#######################################
@app.route("/calibration", methods=["PUT"])
def calibrationAPI():
    global processor
    processor = Processor()
    # TODO: Remove next line to start gaze server
    # return ('', http.HTTPStatus.OK)
    try:
        data = requests.get("http://127.0.0.1:5432")
    except:
        return ('Gaze server connection fail',
                http.HTTPStatus.INTERNAL_SERVER_ERROR)
    return ('', http.HTTPStatus.OK)


########################################
##    User Inputs Related Requests    ##
########################################
@app.route("/input", methods=["POST"])
def user_inputsAPI():
    """API for storing new user input
    payload is json style of shape:\n
    {
        "data": [float, float]
    }
    """
    data = json.loads(request.get_data())
    accepted, complete = processor.process(data["data"])

    content = {"clear": not accepted, 'complete': complete}

    return (content, http.HTTPStatus.OK)


####################################
##      Stage Related Requests    ##
####################################
@app.route('/stage', methods=["GET"])
def current_stageAPI():
    """GET Current Stage

    Returns
    -------
    Response
    {
        "content": {
            "currentStage": str,
            "nextStage": str,
            "transitionDelay": float,
            "params": {} or null
        }
    }

    Note:
    /calibration need to be called once before
    this api to be available
    """
    return processor.get_stage_info()


if __name__ == "__main__":
    app.run(debug=False, port=5050, host=('0.0.0.0'))
