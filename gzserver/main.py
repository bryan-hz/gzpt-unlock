# @deprecated please run app.py instead
import json
import time
import xml.etree.ElementTree as ET
import numpy as np

import requests

from utils.commands import EnableDataStream, EnableStreamBPOG, ScreenSize
from utils.gazepoint import Gazepoint
from utils.tagtype import TagType

MOCK_FLAG = True

machine_host = '100.64.189.236'
machine_port = 4242

screen_width = None
screen_height = None


if MOCK_FLAG:
    from mock import DATA
    for x, y in DATA:
        requests.post("http://127.0.0.1:5050/inputs", json={"x": x, "y": y})
        time.sleep(1/60)
    exit(0)

while not screen_width or not screen_height:
    response = requests.get("http://127.0.0.1:5050/settings",
                            params={"keys": ["screen_width", "screen_height"]})
    screen_settings = json.loads(response.content)
    screen_width = screen_settings["screen_width"]
    screen_height = screen_settings["screen_height"]
    if not screen_width or not screen_height:
        time.sleep(1.0)

print("[INFO] Received screen size {}x{}".format(screen_width, screen_height))

# print(ScreenSize(-1440, 0, 1440, 960).get_xml(TagType.GET))
# print(ScreenSize(-1920, 0, 1920, 1080).get_xml(TagType.SET))
# print(EnableStreamBPOG().set_state(1).get_xml(TagType.SET))
# print(EnableDataStream().get_xml(TagType.GET))

server = Gazepoint(machine_host, machine_port)
server.connect()

server.send(ScreenSize(0, 0, screen_width, screen_height).get_xml(TagType.SET))
print(server.recv())
server.send(EnableStreamBPOG().set_state(1).get_xml(TagType.SET))
print(server.recv())
server.send(EnableDataStream().set_state(1).get_xml(TagType.SET))
print(server.recv())

history = []
false_count = 0
while false_count < 60:
    data = server.recv()
    # print(data)
    try:
        root = ET.fromstring(data)
    except:
        continue
    if root.get("BPOGV") == "1":
        false_count = 0
        x = root.get("BPOGX")
        y = root.get("BPOGY")
        history.append([float(x), float(y)])
        print(x, y)
    else:
        false_count += 1
np.save('data.npy', np.array(history))
exit(0)

while True:
    data = server.recv()
    # print(data)
    try:
        root = ET.fromstring(data)
    except:
        continue
    if root.get("BPOGV") == "1":
        x = root.get("BPOGX")
        y = root.get("BPOGY")
        print(x, y)
        # requests.post("http://127.0.0.1:5050/inputs", json={"x": x, "y": y})

