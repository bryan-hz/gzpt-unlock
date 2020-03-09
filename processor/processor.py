import json
import logging
import time
import numpy as np


class Processor(object):
    def __init__(self):
        with open('stages.json') as f:
            self.stages = json.load(f)
        self.current_stage = self.stages["entry"]
        self.next_stage = self._get_next_stage()
        self.delay = 2
        self.ts = time.time()

    def _get_next_stage(self, action=None):
        if self.stages[self.current_stage]["multi-branching"] and action:
            return self.stages[self.current_stage]["next"][action]
        elif not self.stages[self.current_stage]["multi-branching"]:
            return self.stages[self.current_stage]["next"]
        else:
            raise NotImplementedError(
                'Trying to move to another branch without action')

    def _update_stage(self):
        if not self.next_stage or (time.time() - self.ts) < self.delay:
            return

        self.current_stage = self.next_stage
        self.next_stage = None
        self.ts = None

        self.configs = self._load_config()
        self.inputs = []

    def _load_config(self):
        config_file = self.stages[self.current_stage]["config-file"]
        if config_file:
            with open(config_file) as f:
                return json.load(f)
        else:
            return None

    def process(self, position):
        for button_name, config in self.configs.items():
            center, radius = config["center"], config["range"]
            if np.linalg.norm(np.array(position) - np.array(center)) < radius:
                self.next_stage = self._get_next_stage(button_name)
                self.ts = time.time()
                logging.info(f" {button_name} Detected")

    def get_stage_info(self):
        self._update_stage()
        transition_delay = 0 if not self.ts else (self.ts + self.delay -
                                                  time.time())
        logging.info(f" Current configs: {self.configs}")
        return {
            "currentStage": self.current_stage,
            "nextStage": self.next_stage,
            "transitionDelay": transition_delay,
            "params": None
        }
