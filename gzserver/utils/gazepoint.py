import socket
import xml.etree.ElementTree as ET


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
            print(data)
            if data["ID"] == "CALIB_RESULT":
                self._dismiss_calibration()
                self._end_calibrate()
                return True

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

    ###############
    ##  Control  ##
    ###############

    def _send(self, cmd):
        return self.socket.send(
            str.encode(cmd))

    def _recv(self, buffer_size=1024):
        data = bytes.decode(
            self.socket.recv(buffer_size))
        return dict(ET.fromstring(data).items())
