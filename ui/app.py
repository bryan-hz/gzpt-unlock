import json
import sys
import tkinter as tk

import requests

from constants import (CENTER_OUTLINE_RATIO, CIRCLE_ACTIVE_COLOR,
                       CIRCLE_BG_COLOR, CIRCLE_CENTER_COLOR, DEBUG_MODE,
                       DEFAULT_SCREEN_HEIGHT, DEFAULT_SCREEN_WIDTH,
                       GAP_FONT_RATIO, GAP_HEIGHT_RATIO, GAP_OUTLINE_RATIO,
                       GAP_RADIUS_RATIO, MIN_WINDOW_HEIGHT, MIN_WINDOW_WIDTH,
                       WINDOW_START_MODE)
from messages import (DEBUG_LAST_INPUT, DEBUG_SERVER_UNAVAILABLE,
                      DEBUG_VALIDATE_SUCCESS, INSERT_INSTRUCTION)


class GUI():
    def __init__(self, width: int, height: int):
        super().__init__()
        self.root = tk.Tk()
        self.root.minsize(MIN_WINDOW_WIDTH, MIN_WINDOW_HEIGHT)
        self.root.title('Gaze Pattern Authentication')
        # self.root.resizable(width=False,
        #                     height=False)
        self.root.wm_attributes(WINDOW_START_MODE, 1)
        self.window = tk.Canvas(self.root,
                                width=width,
                                height=height,
                                bd=0,
                                highlightthickness=0)
        self.all_items = set()
        self.active_circle = None
        self.input_zones = {}
        self.window.pack()
        self.reload_page(width, height)

    def start(self):
        """
        Start Running GUI
        """
        print("GUI started!")
        self._update(check_reload=False)
        self.root.mainloop()

    def _update(self, check_reload=True):
        """Main update function
        This function is executed every 500ms

        Parameter
        ---------
        check_reload: bool, optional
        check should reload or not
        """
        if check_reload:
            self._check_update()

        try:
            response_data = json.loads(bytes.decode(
                requests.get("http://127.0.0.1:5050/results").content))
        except requests.ConnectionError:
            self.window.itemconfig(self.debug_text,
                                   text=DEBUG_SERVER_UNAVAILABLE)

        if response_data:
            active_circle = response_data["last_input"]
            validate_success = response_data["validate_success"]
            if DEBUG_MODE:
                self.window.itemconfig(self.debug_text,
                                       text=DEBUG_LAST_INPUT.format(active_circle) +
                                       DEBUG_VALIDATE_SUCCESS.format(validate_success))
                self._activate_circle(active_circle)

        self.window.after(500, self._update)

    def _check_update(self):
        screen_width, screen_height = self.root.winfo_width(), self.root.winfo_height()
        if screen_width != self.width or screen_height != self.height:
            print(self.root.winfo_width(),
                  self.root.winfo_height(), self.width, self.height)
            self.reload_page(screen_width, screen_height)
            requests.put("http://127.0.0.1:5050/settings",
                         json={
                             "screen_width": screen_width,
                             "screen_height": screen_height,
                             "input_zones": self.input_zones
                         })

    def reload_page(self, width, height):
        """Redraw all items in the window

        Parameters
        ----------
        width: int
        width of the window

        height: int
        height of the window
        """
        print("reload")
        self._remove_all_items()

        self.width = width
        self.height = height
        self.gap_len = min(width, height) * GAP_HEIGHT_RATIO
        self.debug_text = self._draw_text(self.width,
                                          self.height,
                                          None,
                                          family="mamelon",
                                          size=20,
                                          anchor='se')
        center_pt = (self.width/2, self.height/2 - self.gap_len/3)
        self.nine_circles, self.input_zones = self._create_nine_points_grid(center_pt,
                                                                            self.gap_len,
                                                                            self.gap_len/GAP_RADIUS_RATIO,
                                                                            width=self.gap_len/GAP_OUTLINE_RATIO,
                                                                            fill=self.from_rgb(CIRCLE_BG_COLOR))
        self.nine_centers, _ = self._create_nine_points_grid(center_pt,
                                                             self.gap_len,
                                                             CENTER_OUTLINE_RATIO*self.gap_len/GAP_OUTLINE_RATIO,
                                                             width=0,
                                                             fill=self.from_rgb(CIRCLE_CENTER_COLOR))
        self.instruction_text = self._draw_text(self.width/2,
                                                4/5*self.height,
                                                INSERT_INSTRUCTION,
                                                family="mamelon",
                                                size=int(self.gap_len/GAP_FONT_RATIO))

        self.all_items.add(self.debug_text)
        for c_id in self.nine_circles:
            self.all_items.add(c_id)
        for p_id in self.nine_centers:
            self.all_items.add(p_id)
        self.all_items.add(self.instruction_text)

    ########################################
    ##    Helper functions for Drawing    ##
    ########################################

    def _draw_circle(self, x, y, r, width, fill):
        c = self.window.create_oval(x-r, y-r, x+r, y+r, width=width, fill=fill)
        return c

    def _draw_text(self, x, y, text, anchor='n', family='Arial', size=20):
        debug_text = self.window.create_text(x,
                                             y,
                                             text=text,
                                             anchor=anchor,
                                             font=(family, size))
        return debug_text

    def _activate_circle(self, circle_id: int):
        """Set activated circle to background color and new active circle to active color

        Parameter
        ---------
        circle_id: int
        number of the circle representing, one of 1-9
        """
        if self.active_circle:
            self.window.itemconfig(
                self.nine_circles[self.active_circle], fill=self.from_rgb(CIRCLE_BG_COLOR))
        if circle_id:
            self.window.itemconfig(
                self.nine_circles[circle_id], fill=self.from_rgb(CIRCLE_ACTIVE_COLOR))
        self.active_circle = circle_id

    ##################################
    ##    Other Helper functions    ##
    ##################################

    def _remove_all_items(self):
        """Remove all items in window"""
        for item in self.all_items:
            self.window.delete(item)
        self.all_items = set()

    def from_rgb(self, rgb: tuple) -> str:
        """Convert rgb to hex color

        Parameter
        ---------
        rgb: tuple
        3 integers representing red, green, blue channels


        Return
        ------
        str
        hex color in format of '#xxxxxx'


        Example
        -------
        >>>from_rgb((255, 10, 5))
        '#ff0a05'
        """
        r, g, b = rgb
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)

    def _create_nine_points_grid(self, center_pt, distance, radius, width=3, fill=None) -> list:
        """Create a Nine-point Grid\n
        7 | 8 | 9\n
        4 | 5 | 6\n
        1 | 2 | 3\n
        The items are stored as above order in list

        Parameters
        ----------
        center_pt: tuple
        position of center point

        distance: float
        distance between two neighbor points

        radius: float
        radius of each point

        Return
        ------
        list
        list of item ids
        """
        ids = [None]
        circles = {}
        circle_class = 1
        cx, cy = center_pt
        for dy in (1, 0, -1):
            for dx in (-1, 0, 1):
                center_x = cx+dx*distance
                center_y = cy+dy*distance
                ids.append(self._draw_circle(center_x,
                                             center_y,
                                             radius,
                                             width,
                                             fill))
                circles[str(circle_class)] = ((center_x, center_y), radius)
                circle_class += 1

        return ids, circles


if __name__ == "__main__":
    try:
        screen_width, screen_height = sys.argv[1], sys.argv[2]
    except:
        screen_width, screen_height = DEFAULT_SCREEN_WIDTH, DEFAULT_SCREEN_HEIGHT
    gui = GUI(int(screen_width), int(screen_height))
    gui.start()
