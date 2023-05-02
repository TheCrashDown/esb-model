import peewee

from .base import BaseModel


class Message(BaseModel):
    content = peewee.TextField()

    class Meta:
        db_table = "message"


Message.create_table()
