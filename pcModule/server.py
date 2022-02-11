import sys
import websockets
import asyncio
import socket
import json
import mouse
import pyautogui

def clickMouse(button):
    if(button == "Left"):
        mouse.click(button="left")
        mouse.release(button="left")
    elif(button == "Right"):
        mouse.click(button="right")
        mouse.release(button="right")
    return

def moveMouse(mousePos):
    mouse.move(mousePos[0], mousePos[1], absolute=False)
    return

def closeServer():
    print("Closing Server")
    sys.exit()

async def recvInfo(websocket, path):
    prevPos = (0,0)
    curPos = (0,0)
    difPos = (0,0)
    mouseSpeed = 2

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
                speed = mouseSpeed
                difPos = (round((curPos[0] - prevPos[0])*speed, 10), round((curPos[1] - prevPos[1])*speed, 10))
                touchType = data['type']
                # print(dataObj)
                # print("Diff : " + str(difPos)) 

                if(touchType == "Move"):
                    moveMouse(difPos)        
                if(touchType == "Left"):
                    clickMouse("Left")
                if(touchType == "Right"):
                    clickMouse("Right")
        except:
            print("Disconnected")
            break


async def openServer():
    print("Starting Server on " + IP + ":" + str(PORT))
    async with websockets.serve(recvInfo, IP, PORT):
        await asyncio.Future()


PORT = 1234

while(True):
    try:
        IP = socket.gethostbyname(socket.gethostname())
        asyncio.run(openServer())
        break

    except KeyboardInterrupt:
        print("Server Stopped")
        sys.exit()
    except Exception as e:
        print(e)
        print("Server Error at PORT " + str(PORT))
        PORT += 1
        continue

