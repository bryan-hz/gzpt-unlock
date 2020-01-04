import http
import json
import time

from flask import Flask, request
import random

app = Flask(__name__)
results = list()
historical_inputs = list()


@app.route("/")
def home():
    return "Welcome Processing Server!"


@app.route("/results", methods=["GET", "POST"])
def get_authentication_result():
    global results, historical_inputs
    if request.method == "GET":
        try:
            data = json.dumps(historical_inputs[-1])
        except:
            data = 'None'
        return {
            "validate_success": random.choice([True, False]),
            "last_input": random.choice([None, *list(range(1, 9))])
        }
    elif request.method == "POST":
        raw_data = request.get_data()
        data = json.loads(raw_data).get("data")
        historical_inputs.extend(data)
        if len(historical_inputs) > 1000:
            print('long')
            historical_inputs.pop(0)
        print(historical_inputs[-1], len(historical_inputs))
        return ('', http.HTTPStatus.NO_CONTENT)
    else:
        return ('', http.HTTPStatus.BAD_REQUEST)


if __name__ == "__main__":
    app.run(debug=True, port=5050)
