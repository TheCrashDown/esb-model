from fastapi import APIRouter

from models import Message, Client
from datetime import datetime

from broker import brocker

api_router = APIRouter()


@api_router.get("/get_clients")
def get_clients():
    """Get list of clients"""

    clients = Client.select(
        Client.id, Client.address, Client.name.alias("title")
    ).where(Client.id << brocker.get_clients())

    return {
        "clients": [i for i in clients.dicts()] if clients.exists() else [],
    }


@api_router.post("/save_config")
def save_config(config: list):
    """Save config to backend"""

    brocker.set_config(config)
    return {"success": True, "config": config}


@api_router.post("/connect")
def connect_to_esb(data: dict):
    """Connect new client to esb"""

    client = Client.create(
        address=data.get("address"),
        name=data.get("name", ""),
        format=data.get("format", "json"),
    )
    return brocker.add_client(client)


@api_router.post("/send")
def send_to_esb(data: dict):
    """Send message to esb"""

    brocker.recieve_messages(
        address=data.get("address"),
        message=data.get("message"),
        format=data.get("format", "json"),
    )
    return {"success": True}
