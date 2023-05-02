import peewee

from .base import BaseModel


class Client(BaseModel):
    class Meta:
        db_table = "client"

    id = peewee.AutoField(primary_key=True)
    address = peewee.TextField(null=False)


Client.create_table()


class Message(BaseModel):
    class Meta:
        db_table = "message"

    id = peewee.AutoField(primary_key=True)
    content = peewee.TextField()
    sender = peewee.ForeignKeyField(model=Client, to_field="id")


Message.create_table()
