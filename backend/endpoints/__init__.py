from fastapi import APIRouter

from models import Message, Client
from datetime import datetime

api_router = APIRouter()


@api_router.get("/")
def test():
    c = Client.create(address="1.0.1.0")
    Message.create(content=datetime.now(), sender=c)

    return {
        "msg": [m for m in Message.select().dicts()],
        "clients": [m for m in Client.select().dicts()],
    }
