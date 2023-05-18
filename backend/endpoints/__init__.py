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
    return {"config": config}
