import tkinter as tk

import requests


class GUI():
    def __init__(self):
        super().__init__()
        self.root = tk.Tk()
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
        self.window.itemconfig(self.text_id,
                               text='hello')

    def start(self):
        print("GUI started!")
        self.update()
        self.root.mainloop()

    def update(self):
        try:
            auth_flag = requests.get("http://127.0.0.1:5050/results")
            self.window.itemconfig(self.text_id,
                                   text=bytes.decode(auth_flag.content))
        except requests.ConnectionError:
            self.window.itemconfig(self.text_id,
                                   text="Error: 404 Server Not Found!")
        self.window.move(self.text_id, -1, -1)
        self.window.after(50, self.update)


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
