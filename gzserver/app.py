import time
import socket
import xml.etree.ElementTree as ET
from utils.gazepoint import Gazepoint
import sys
import logging

root = logging.getLogger()
root.setLevel(logging.DEBUG)


class App():
    def __init__(self, gazepoint_addr):
        super().__init__()
        logging.info(" App Initializing...")
        self.gazepoint = Gazepoint(gazepoint_addr, 4242)
        try:
            self.gazepoint.connect()
        except:
            logging.error(" Gazepoint connection failed\nExit")
            exit(1)
        logging.info(" Gazepoint connected")
        self.response_template = str.encode("HTTP/1.1 200 OK\n"
                                            + "Content-Type: text/html\n"
                                            + "\n"
                                            + '{ "id": "Gaze Machine Server" }\n')

    def wait_instruction(self):
        # Wait for Processor Instruction
        logging.info(' Wait for further instruction from processor')
        listener = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        listener.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        listener.bind(('127.0.0.1', 5432))
        listener.listen(5)
        client, addr = listener.accept()
        client.send(self.response_template)
        client.shutdown(socket.SHUT_RDWR)
        client.close()

    def calibrate(self):
        # Do calibration
        try:
            self.gazepoint.calibrate()
        except:
            logging.error(" Exception during calibration\nExit")

    def close(self):
        self.gazepoint.close()


if __name__ == "__main__":
    """
    Run with
    >>> python3 app.py 127.0.0.1
    """
    gazepoint_addr = sys.argv[1]
    app = App(gazepoint_addr)
    app.wait_instruction()
    app.calibrate()
    exit(0)


# exit(0)
# server.send('<SET ID="CALIBRATE_SHOW" STATE="1" />\r\n')
# print(server.recv())
# server.send('<SET ID="CALIBRATE_START" STATE="1" />\r\n')
# server.recv()
# while True:
#     data = server.recv()
#     print(data)
#     root = ET.fromstring(data)

#     if root.get("ID") == "CALIB_RESULT":
#         print("done")
# #         server.send('<SET ID="CALIBRATE_SHOW" STATE="0" />\r\n')
# #         print(server.recv())
#         server.send('<SET ID="CALIBRATE_START" STATE="0" />\r\n')
#         print(server.recv())
#         break
