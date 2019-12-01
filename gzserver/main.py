from utils.commands import EnableDataStream, EnableStreamBPOG, ScreenSize
from utils.gazepoint import Gazepoint
from utils.tagtype import TagType
import xml.etree.ElementTree as ET
import requests
import json

machine_host = '192.168.0.26'
machine_port = 4242

# print(ScreenSize(-1440, 0, 1440, 960).get_xml(TagType.GET))
# print(ScreenSize(-1920, 0, 1920, 1080).get_xml(TagType.SET))
# print(EnableStreamBPOG().set_state(1).get_xml(TagType.SET))
# print(EnableDataStream().get_xml(TagType.GET))

server = Gazepoint(machine_host, machine_port)
server.connect()

server.send(ScreenSize(-1920, 0, 1920, 1080).get_xml(TagType.SET))
print(server.recv())
server.send(EnableStreamBPOG().set_state(1).get_xml(TagType.SET))
print(server.recv())
server.send(EnableDataStream().set_state(1).get_xml(TagType.SET))
print(server.recv())

while True:
    data = server.recv()
    print(data)
    try:
        root = ET.fromstring(data)
    except:
        continue
    if root.get("BPOGV") == "1":
        x = root.get("BPOGX")
        y = root.get("BPOGY")
        print(x, y)
        requests.post("http://127.0.0.1:5050/results",
                      json.dumps({"data": [(x, y)]}))
