from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
import json
from datetime import datetime

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.websocket("/chat/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            # Simular respuesta automática
            response = {
                "user": "Tutor IA",
                "text": "He recibido tu mensaje. ¿En qué puedo ayudarte?",
                "timestamp": datetime.now().isoformat()
            }
            
            await websocket.send_text(json.dumps(response))
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)

@router.get("/chat/messages")
async def get_chat_messages():
    # Mensajes de ejemplo para el chat
    return [
        {
            "id": 1,
            "user": "Tutor Carlos",
            "text": "¡Hola! ¿En qué puedo ayudarte hoy?",
            "timestamp": "2024-01-01T10:00:00"
        },
        {
            "id": 2,
            "user": "María López",
            "text": "Tengo una duda sobre el ejercicio de matemáticas",
            "timestamp": "2024-01-01T10:05:00"
        },
        {
            "id": 3,
            "user": "Tutor Carlos",
            "text": "Claro, dime específicamente qué no entiendes",
            "timestamp": "2024-01-01T10:10:00"
        }
    ]