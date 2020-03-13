# Gaze Machine Server

### Get Started

1. Create virtural environment
```bash
>>> virtualenv .venv
>>> source .venv/bin/activate
```
2. Install dependencies
```bash
>>> pip3 install numpy
>>> pip3 install requests
>>> pip3 install sklearn
```
3 Run app
To run Gaze Machine Server, gaze machine itself should be running, for example, it's running at port `127.0.0.1:4242`
```bash
>>> python3 app.py 127.0.0.1
```
Gaze Machine Server by default will assume gaze machine is running at port `4242`
