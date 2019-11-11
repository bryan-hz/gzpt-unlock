from gzserver.commands import EnableDataStream, EnableStreamBPOG, ScreenSize
from gzserver.tagtype import TagType
from gzserver.gazepoint import Gazepoint

print(EnableStreamBPOG().set_state(1).get_xml(TagType.SET))
print(ScreenSize(-1440, 0, 1440, 960).get_xml(TagType.GET))
print(EnableDataStream().get_xml(TagType.GET))

server = Gazepoint('127.0.0.1', 5000)