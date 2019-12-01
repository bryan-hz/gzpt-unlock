from utils.tagtype import TagType


class Command():
    """
    Abstract class for commands
    """

    def get_xml(self, tag: TagType) -> str:
        param_str = ""
        for label, value in self.params.items():
            if value is not None:
                param_str += '{}="{}" '.format(label,
                                                 value)
        return '<{} {}/>\r\n'.format(tag, param_str)


class EnableStreamBPOG(Command):
    def __init__(self, state=None):
        super().__init__()
        self.params = {"ID": "ENABLE_SEND_POG_BEST",
                       "STATE": state}

    def set_state(self, state):
        self.params["STATE"] = state
        return self


class EnableDataStream(Command):
    def __init__(self, state=None):
        super().__init__()
        self.params = {"ID": "ENABLE_SEND_DATA",
                       "STATE": state}

    def set_state(self, state):
        self.params["STATE"] = state
        return self


class ScreenSize(Command):
    def __init__(self, x=None, y=None, width=None, height=None):
        super().__init__()
        self.params = {"ID": "SCREEN_SIZE",
                       "X": x,
                       "Y": y,
                       "WIDTH": width,
                       "HEIGHT": height}

    def set_x(self, x):
        self.params["X"] = x
        return self

    def set_y(self, y):
        self.params["Y"] = y
        return self

    def set_width(self, width):
        self.params["WIDTH"] = width
        return self

    def set_height(self, height):
        self.params["HEIGHT"] = height
        return self
