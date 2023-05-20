from fastapi import APIRouter

from models import Message, Client
from datetime import datetime

from broker import brocker

api_router = APIRouter()


@api_router.get("/clients")
def get_clients():
    return {
        "clients": brocker.get_clients().dicts().get(),
    }


@api_router.get("/test")
def test():
    # c = Client.create(address="1.0.1.0")
    # m = Message.create(content=datetime.now(), sender=c, format="json")

    # brocker.add_client(c)
    Client.create(address="1.0.1.1")
    c = Client.select().where(Client.address == "1.0.1.1")

    if not c.exists():
        return "null222"

    return {
        "msg": c.get().address,
    }


@api_router.post("/save_config")
def save_config(config: list):
    brocker.set_config(config)
    return {"success": True, "config": config}


@api_router.post("/connect")
def connect_to_esb(address):
    client = Client.create(address=address)
    brocker.add_client(client)
    return {"success": True, "address": address}
