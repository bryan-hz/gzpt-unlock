import logging
import socket
import sys
import xml.etree.ElementTree as ET
from collections import deque

import numpy as np
from sklearn.mixture import GaussianMixture

from utils.gazepoint import Gazepoint

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
        # http://127.0.0.1:5432 GET
        logging.info(" Wait for further instruction from processor")
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
        logging.info(" Calibration Starts")
        try:
            self.gazepoint.calibrate()
        except:
            logging.error(" Exception during calibration\nExit")
        logging.info(" Calibration Ends")

    def main_loop(self):
        # Keep reading data from gaze machine
        # And send valid predictions to processor
        self.gazepoint.enable_data_stream()
        MAX_DATA_POINTS = 30
        historical_data = deque(maxlen=MAX_DATA_POINTS)
        while True:
            position = self.gazepoint.read_position(60)
            if position:
                historical_data.append(position)
            else:
                historical_data.clear()

            if len(historical_data) < MAX_DATA_POINTS:
                continue

            valid_center = self._get_valid_center(historical_data)
            if valid_center is not None:
                login_dist = np.linalg.norm(
                    np.array([0.5000, 0.5861]) - np.array(valid_center))
                reset_dist = np.linalg.norm(
                    np.array([0.8172, 0.8083]) - np.array(valid_center))
                if login_dist < 0.1463:
                    logging.info(" Login")
                if reset_dist < 0.1417:
                    logging.info(" Reset")
                logging.info("{}, {}, {}".format(
                    valid_center, login_dist, reset_dist))

    def _get_valid_center(self, positions: list, cov_threshold=2e-4):
        # Get mean of 2 gaussian distributions based on positions
        # Only when covariance less than threshold would be counted.
        gmm = GaussianMixture(n_components=2,
                              covariance_type='full').fit(positions)
        cov_xx = gmm.covariances_[:, 0, 0]
        cov_yy = gmm.covariances_[:, 1, 1]

        valid_means = []
        if cov_xx[0] < cov_threshold and cov_yy[0] < cov_threshold:
            valid_means.append(gmm.means_[0])
        if cov_xx[1] < cov_threshold and cov_yy[1] < cov_threshold:
            valid_means.append(gmm.means_[1])

        if valid_means:
            return np.mean(valid_means, axis=0)
        else:
            return None

    def close(self):
        self.gazepoint.close()
        logging.info(" Gazepoint connection closed")


if __name__ == "__main__":
    """
    Run with
    >>> python3 app.py 127.0.0.1
    """
    gazepoint_addr = sys.argv[1]
    app = App(gazepoint_addr)
    app.wait_instruction()
    app.calibrate()
    app.main_loop()
    exit(0)
