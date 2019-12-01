from enum import Enum


class TagType(Enum):
    GET = "GET"
    SET = "SET"

    def __str__(self):
        return self.value
