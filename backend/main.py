from fastapi import FastAPI, WebSocket
import cv2
import asyncio

app = FastAPI()

# Inicializa a captura de vídeo
def get_video_capture():
    cap = cv2.VideoCapture(0)  # Usa a webcam padrão
    return cap

@app.websocket("/video")
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    cap = get_video_capture()
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        _, buffer = cv2.imencode('.jpg', frame)
        await websocket.send_bytes(buffer.tobytes())
        await asyncio.sleep(0.03)  # Controle de taxa de frames
    
    cap.release()
