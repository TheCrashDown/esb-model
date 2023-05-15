import peewee

from .base import BaseModel


class Client(BaseModel):
    class Meta:
        db_table = "client"

    id = peewee.AutoField(primary_key=True)
    address = peewee.TextField(null=False)
    name = peewee.TextField(null=True)


Client.create_table()


class Queue(BaseModel):
    class Meta:
        db_table = "queue"

    id = peewee.AutoField(primary_key=True)


Queue.create_table()


class Message(BaseModel):
    class Meta:
        db_table = "message"

    id = peewee.AutoField(primary_key=True)
    content = peewee.TextField()
    sender = peewee.ForeignKeyField(model=Client, to_field="id")
    format = peewee.TextField(null=False)
    quere = peewee.ForeignKeyField(
        model=Queue, to_field="id", backref="messages", null=True
    )


Message.create_table()
