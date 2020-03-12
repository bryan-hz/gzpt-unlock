import json
import logging
import time
from collections import deque
from typing import Tuple, Union

import numpy as np

MAX_TRIALS = 3
TRANSITION_DELAY = 2
REENTER_DELAY = 3
INIT_PENALTY_DELAY = 10


class Processor(object):
    def __init__(self):
        self.stages = self._load_stages()
        self.users = self._load_users()
        self.autofills = self._load_autofills()
        self.current_user = self.users["test"]

        self.current_stage = self.stages["entry"]
        self.next_stage = self._get_next_stage()
        self.delay = 2
        self.ts = time.time()

        self.configs = None
        self.custom_rule = None

        self.inputs = deque()
        self.connections = deque()
        self.remaining_trials = MAX_TRIALS
        self.penalty_delay = INIT_PENALTY_DELAY

        logging.info(" Processor initialized")
        self._logging_stage_info()

    def _load_stages(self) -> dict:
        with open('stages.json') as f:
            return json.load(f)

    def _load_users(self) -> dict:
        with open('users.json') as f:
            return json.load(f)

    def _save_users(self) -> None:
        with open('users.json', 'w') as f:
            f.write(json.dumps(self.users, indent=4))

    def _load_autofills(self) -> dict:
        with open('autofills.json') as f:
            return json.load(f)

    def _get_next_stage(self, action: str = None):
        if self.stages[self.current_stage]["multi-branching"] and action:
            return self.stages[self.current_stage]["next"][action]
        elif not self.stages[self.current_stage]["multi-branching"]:
            return self.stages[self.current_stage]["next"]
        else:
            raise NotImplementedError(
                'Trying to move to another branch without action')

    def _is_done(self):
        # Always running
        return False
        # return (self.current_stage == 'complete' or self.next_stage == 'complete')

    def _update_stage(self) -> None:
        if not self.next_stage or (time.time() - self.ts) < self.delay:
            return
        self.current_stage = self.next_stage
        self.next_stage = None
        self.ts = None

        try:
            self.custom_rule = self.stages[self.current_stage]["custom-rule"]
        except KeyError:
            self.custom_rule = False
        self.configs = self._load_config()
        input_len = self.stages[self.current_stage]["input-length"]
        self.inputs = deque(maxlen=input_len)
        if not self.remaining_trials:
            self.remaining_trials = MAX_TRIALS

        # Used in password related stages only
        self.connections = deque()

        logging.info(f" Stage is updated to {self.current_stage}")
        logging.info(f" Current stage config {self.configs}")

    def _load_config(self) -> Union[dict, None]:
        config_file = self.stages[self.current_stage]["config-file"]
        if config_file:
            with open(config_file) as f:
                return json.load(f)
        else:
            return None

    def process(self, position: list) -> Tuple[bool, bool]:
        if self.next_stage or self._is_done():
            return False, self._is_done()
        if self._is_reset_area(position):
            logging.info(" - RESET - Detected\n")
            self.inputs.clear()
            self.connections.clear()
            return True, self._is_done()

        button = self._get_button(position)

        if button and button not in self.inputs:
            # TODO: Replace above with next line to enable nonduplication inputs
            # if button:
            self.inputs.append(button)
            logging.info(f" - {button} - Detected\n" +
                         f"\tCurrent inputs: {self.inputs}")

            if self.custom_rule:
                self._handle_custom_rules()
            else:
                self._handle_common_rule()
        return True, self._is_done()

    def _is_reset_area(self, position: list) -> bool:
        if self.current_stage in ['register_input_phase_one',
                                  'register_input_phase_two',
                                  'login_input']:
            if position[0] < 0.21875 or position[0] > 0.78125:
                return True
        return False

    def _get_button(self, position: list) -> Union[str, None]:
        for button_name, config in self.configs.items():
            center, radius = config["center"], config["range"]
            if np.linalg.norm(np.array(position) - np.array(center)) < radius:
                return button_name
        return None

    def _handle_common_rule(self):
        self.next_stage = self._get_next_stage(self.inputs[0])
        self.ts = time.time()

        self._logging_stage_info()

    def _get_latest_two_inputs(self):
        return ''.join(list(self.inputs)[-2:])

    def _insert_autofill(self):
        latest_two = self._get_latest_two_inputs()
        if latest_two in self.autofills:
            autofill = self.autofills[latest_two]

            if autofill in self.inputs:
                conn1 = ''.join([autofill, self.inputs[-2], autofill])
                conn2 = ''.join([autofill, self.inputs[-1], autofill])
                if (conn1[:2] not in self.connections and conn1[1:] not in self.connections):
                    self.connections.append(conn1[:2])
                if (conn2[:2] not in self.connections and conn2[1:] not in self.connections):
                    self.connections.append(conn2[:2])
                return

            logging.info(f" Current input: {self.inputs}\n" +
                         f" Autofilling - {autofill} - ...")
            if len(self.inputs) == self.inputs.maxlen:
                self.inputs.pop()
                self.inputs.append(autofill)
                self.connections.append(self._get_latest_two_inputs())
            else:
                latest_one = self.inputs.pop()
                self.inputs.append(autofill)
                self.connections.append(self._get_latest_two_inputs())
                self.inputs.append(latest_one)
                self.connections.append(self._get_latest_two_inputs())

            logging.info(" Autofill complete\n" +
                         f" Current inputs: {self.inputs}")
        else:
            self.connections.append(self._get_latest_two_inputs())

    def _handle_custom_rules(self) -> None:
        if self.current_stage == 'register_input_phase_one':
            if len(self.inputs) > 1:
                self._insert_autofill()
            if len(self.inputs) == self.inputs.maxlen:
                self.current_user["password"] = ''.join(self.inputs)
                self.next_stage = self._get_next_stage()
                self.ts = time.time()
                self.delay = 5

                self._logging_stage_info()
        elif self.current_stage == 'register_input_phase_two':
            if len(self.inputs) > 1:
                self._insert_autofill()
            if len(self.inputs) == self.inputs.maxlen:
                match = self.current_user["password"] == ''.join(self.inputs)
                if match:
                    self._save_users()
                self.next_stage = self._get_next_stage(str(match))
                self.ts = time.time()

                self._logging_stage_info()
        elif self.current_stage == 'login_input':
            if len(self.inputs) > 1:
                self._insert_autofill()
            if len(self.inputs) == self.inputs.maxlen:
                match = self.current_user["password"] == ''.join(self.inputs)
                if not match:
                    self.remaining_trials -= 1
                    if not self.remaining_trials:
                        self.delay = self.penalty_delay
                        self.penalty_delay *= 2
                    else:
                        self.delay = REENTER_DELAY
                else:
                    self.delay = TRANSITION_DELAY
                self.next_stage = self._get_next_stage(str(match))
                self.ts = time.time()

                self._logging_stage_info()
        else:
            logging.error(" Custom rule not specified")

    def get_stage_info(self) -> dict:
        self._update_stage()
        transition_delay = 0 if not self.ts else (self.ts + self.delay -
                                                  time.time())

        return {
            "currentStage": self.current_stage,
            "nextStage": self.next_stage,
            "transitionDelay": transition_delay,
            "params": {
                "buttons": list(self.inputs),
                "links": list(self.connections),
                "remainingTrials": self.remaining_trials,
                "nextPenaltyTime": self.penalty_delay
            }
        }

    def _logging_stage_info(self) -> None:
        logging.info(f" Changing stage: \n" +
                     f"\tfrom: {self.current_stage}\n" +
                     f"\tto: {self.next_stage}\n" +
                     f"\tafter: {self.delay}s\n")
