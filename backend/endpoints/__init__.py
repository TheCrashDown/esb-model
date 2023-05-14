from fastapi import APIRouter

from models import Message, Client
from datetime import datetime

from broker import brocker

api_router = APIRouter()


@api_router.get("/clients")
def get_clients():
    return {
        "clients": brocker.get_clients(),
    }


@api_router.get("/test")
def test():
    c = Client.create(address="1.0.1.0")
    m = Message.create(content=datetime.now(), sender=c, format="json")

    brocker.add_client(c)

    return {
        "msg": [m for m in Message.select().dicts()],
        "clients": [m for m in Client.select().dicts()],
    }
