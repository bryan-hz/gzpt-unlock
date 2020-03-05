import socket
import xml.etree.ElementTree as ET
from collections import defaultdict


class Gazepoint():
    """Gazepoint server

    Examples
    --------
    >>> server = Gazepoint('127.0.0.1', 5000)
    >>> server.connect()
    >>> server.send("GET / HTTP/1.1\r\n\r\n")
    18
    >>> server.recv()
    'Hello'
    >>> server.close()
    """

    def __init__(self, host, port):
        self.socket = socket.socket(socket.AF_INET,
                                    socket.SOCK_STREAM)
        self.addr = (host, port)

    ##################
    ##  Connection  ##
    ##################

    def connect(self):
        self.socket.connect(self.addr)

    def close(self):
        self.socket.close()

    ###################
    ##  Calibration  ##
    ###################

    def calibrate(self):
        self._show_calibration()
        self._start_calibrate()
        while True:
            data = self._recv()
            if data["ID"] == "CALIB_RESULT":
                self._dismiss_calibration()
                self._end_calibrate()
                return True

    def read(self):
        return self._recv()

    def _start_calibrate(self):
        self._send('<SET ID="CALIBRATE_START" STATE="1" />\r\n')
        return self._recv()

    def _end_calibrate(self):
        self._send('<SET ID="CALIBRATE_START" STATE="0" />\r\n')
        return self._recv()

    def _show_calibration(self):
        self._send('<SET ID="CALIBRATE_SHOW" STATE="1" />\r\n')
        return self._recv()

    def _dismiss_calibration(self):
        self._send('<SET ID="CALIBRATE_SHOW" STATE="0" />\r\n')
        return self._recv()

    ###################
    ##  Data Stream  ##
    ###################
    def enable_data_stream(self):
        self._send(
            '<SET ID="SCREEN_SIZE" X="0" Y="0" WIDTH="1920" HEIGHT="1080"/>\r\n')
        _ = self._recv()
        self._send('<SET ID="ENABLE_SEND_POG_BEST" STATE="1" />\r\n')
        _ = self._recv()
        self._send('<SET ID="ENABLE_SEND_DATA" STATE="1" />\r\n')
        return self._recv()

    def reset_data_stream(self):
        self._send('<SET ID="ENABLE_SEND_POG_BEST" STATE="0" />\r\n')
        _ = self._recv()
        self._send('<SET ID="ENABLE_SEND_DATA" STATE="0" />\r\n')
        return self._recv()

    def read_position(self, max_fail_times=float('inf')) -> list:
        fail_times = 0
        while fail_times < max_fail_times:
            response = self._recv()
            if response["BPOGV"] == "1":
                return [response["BPOGX"], response["BPOGY"]]
            else:
                fail_times += 1
        return []

    ###############
    ##  Control  ##
    ###############

    def _send(self, cmd):
        return self.socket.send(
            str.encode(cmd))

    def _recv(self, buffer_size=1024):
        data = bytes.decode(
            self.socket.recv(buffer_size))
        try:
            return defaultdict(str,
                               ET.fromstring(data).items())
        except:
            return defaultdict(str)
