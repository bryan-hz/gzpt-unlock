import socket

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

    def connect(self):
        self.socket.connect(self.addr)

    def close(self):
        self.socket.close()

    def send(self, msg):
        return self.socket.send(
            str.encode(msg))

    def recv(self, buffer_size=1024):
        return bytes.decode(
            self.socket.recv(buffer_size))
