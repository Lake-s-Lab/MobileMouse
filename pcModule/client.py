import asyncio
import websockets

async def main():
    async with websockets.connect('ws://localhost:1234') as websocket:
        await websocket.send("Hello Server!")
        data = await websocket.recv()
        print("Data : " + data)


asyncio.get_event_loop().run_until_complete(main())