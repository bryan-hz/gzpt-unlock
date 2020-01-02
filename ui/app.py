import tkinter as tk

import requests


class GUI():
    def __init__(self):
        super().__init__()
        self.root = tk.Tk()
        self.root.title('Gaze Pattern Authentication')
        self.root.resizable(width=False,
                            height=False)
        self.root.wm_attributes("-topmost", 1)
        self.window = tk.Canvas(self.root,
                                width=1920,
                                height=1080,
                                bd=0,
                                highlightthickness=0)
        self.window.pack()
        self.text_id = self.window.create_text(1920,
                                               1080,
                                               anchor='se')
        self.nine_circles = self._create_nine_points_grid((960, 400),
                                                          250,
                                                          50,
                                                          fill=self.from_rgb(201, 221, 240))
        self.nine_centers = self._create_nine_points_grid((960, 400),
                                                          250,
                                                          6,
                                                          fill='black')
        self.instruction_text = self._draw_text(960, 800, "Hi, trace your pattern with your eyes.", family='mamelon', size=40)
        # self.instruction_text = self.window.create_text(700, 700, anchor='se', text='Hi, trace your pattern with your eyes', font=('mamelon', 50))
        self.window.itemconfig(self.text_id,
                               text='hello')

    def from_rgb(self, r: int, g: int, b: int) -> str:
        """Convert rgb to hex color

        Parameter
        ---------
        r: int
        number of red channel

        g: int
        number of green channel

        b: int
        number of blue channel


        Return
        ------
        str
        hex color in format of '#xxxxxx'


        Example
        -------
        >>>from_rgb((255, 10, 5))
        '#ff0a05'
        """
        return '#{:02x}{:02x}{:02x}'.format(r, g, b)

    def _create_nine_points_grid(self, center_pt, distance, radius, width=3, fill=None) -> list:
        """Create a Nine-point Grid
        7 | 8 | 9
        4 | 5 | 6
        1 | 2 | 3
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
        cx, cy = center_pt
        for dy in (1, 0, -1):
            for dx in (-1, 0, 1):
                ids.append(self._draw_circle(cx+dx*distance,
                                             cy+dy*distance, radius, width, fill))

        return ids

    def _draw_circle(self, x, y, r, width, fill):
        c = self.window.create_oval(x-r, y-r, x+r, y+r, width=width, fill=fill)
        return c

    def _draw_text(self, x, y, text, anchor='n', family='Arial', size=20):
        text_id = self.window.create_text(x, y, text=text, anchor=anchor, font=(family, size))
        return text_id

    def start(self):
        print("GUI started!")
        self._update()
        self.root.mainloop()

    def _update(self):
        try:
            auth_flag = requests.get("http://127.0.0.1:5050/results")
            self.window.itemconfig(self.text_id,
                                   text=bytes.decode(auth_flag.content))
        except requests.ConnectionError:
            self.window.itemconfig(self.text_id,
                                   text="Error: 404 Server Not Found!")
        self.window.move(self.text_id, -1, -1)
        self.window.after(50, self._update)


if __name__ == "__main__":
    gui = GUI()
    gui.start()

# from tkinter import *
# import random
# import time
# import requests

# root = Tk()
# root.title = "Game"
# root.resizable(0,0)
# root.wm_attributes("-topmost", 1)

# canvas = Canvas(root, width=1920, height=1080, bd=0, highlightthickness=0)
# canvas.pack()

# class Ball:
#     def __init__(self, canvas, color):
#         self.canvas = canvas
#         self.id = canvas.create_oval(10, 10, 25, 25, fill=color)
#         self.canvas.move(self.id, 245, 100)

#         self.canvas.bind("<Button-1>", self.canvas_onclick)
#         self.text_id = self.canvas.create_text(300, 200, anchor='se')
#         self.canvas.itemconfig(self.text_id, text='hello')

#     def canvas_onclick(self, event):
#         self.canvas.itemconfig(
#             self.text_id,
#             text="You clicked at ({}, {})".format(event.x, event.y)
#         )

#     def draw(self):
#         data = requests.get("http://127.0.0.1:5000/")
#         if bytes.decode(data.content) == "Nana welcomes you!":
#             self.canvas.move(self.id, 0, -1)
#         self.canvas.after(50, self.draw)


# ball = Ball(canvas, "red")
# ball.draw()  #Changed per Bryan Oakley's comment.
# root.mainloop()
