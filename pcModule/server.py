import websockets
import asyncio
import socket
import json
import mouse
import pyautogui

def clickMouse():
    mouse.click(button="left")
    mouse.release(button="left")
    return

def moveMouse(mousePos):
    mouse.move(mousePos[0], mousePos[1], absolute=False)
    return

async def main(websocket, path):
    prevPos = (0,0)
    curPos = (0,0)
    difPos = (0,0)
    while True:
        try:
            dataObj = await websocket.recv()
            data = json.loads(dataObj)
            
            if(data["type"] == "Connect"):
                print("Connected")
                continue
            else:
                prevPos = curPos
                curPos = (float(data['x']), float(data['y']))
                speed = float(data['speed'])
                difPos = (round((curPos[0] - prevPos[0])*speed, 10), round((curPos[1] - prevPos[1])*speed, 10))
                touchType = data['type']
                print(dataObj)
                print("Diff : " + str(difPos)) 

                if(touchType == "Move"):
                    moveMouse(difPos)        
                if(touchType == "Release" and curPos == (0,0)):
                    clickMouse()

        except websocket.exceptions.ConnectionClosed:
            print("Connection closed")
            break


PORT = 1234
IP = socket.gethostbyname(socket.gethostname())
start_server = websockets.serve(main, IP, PORT)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()