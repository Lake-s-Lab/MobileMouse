import sys
from pystray import MenuItem as item
import pystray
from PIL import Image

def quit():
    icon.stop()

def main(ip, port):
    global icon
    image = Image.open("favicon.ico")
    menu = item('Quit', quit)
    icon = pystray.Icon("Mobile Mouse PC Server", image, "{}:{}".format(ip,port), menu)
    icon.run()

main(1,2)