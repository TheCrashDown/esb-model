from fastapi import APIRouter

from models import Message
from datetime import datetime

api_router = APIRouter()


@api_router.get("/")
def test():
    Message.create(content=datetime.now())

    return [m for m in Message.select().dicts()]
