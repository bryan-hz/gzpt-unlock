"""
constants.py
"""

#############################
##   Window Settings       ##
#############################
MIN_WINDOW_WIDTH = 480
MIN_WINDOW_HEIGHT = 360

"""
One of following:
-alpha, -fullscreen, -modified, -notify, -titlepath, -topmost, or -transparent
"""
WINDOW_START_MODE = "-fullscreen"


#############################
##   Screen Settings       ##
#############################
DEFAULT_SCREEN_WIDTH = 1920
DEFAULT_SCREEN_HEIGHT = 1080


##################################
##   Nine-point Grid Settings   ##
##################################
""" Ratios """
GAP_HEIGHT_RATIO = 1 / 3.8 # gap / height
GAP_RADIUS_RATIO = 3.5 # gap / circle radius
GAP_OUTLINE_RATIO = 65 # gap / circle outline thickness
CENTER_OUTLINE_RATIO = 1.2 # center radius / circle outline thickness
GAP_FONT_RATIO = 4 # gap / font size

""" Colors """
CIRCLE_BG_COLOR = (201, 221, 240)
CIRCLE_CENTER_COLOR = (0, 0, 0)
CIRCLE_ACTIVE_COLOR = (90, 192, 37)

##################################
##   Nine-point Grid Settings   ##
##################################
DEBUG_MODE = True
