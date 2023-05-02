from fastapi import FastAPI

from models import Message

from datetime import datetime

app = FastAPI()

@app.get("/")
def helloworld():
    Message.create(content=datetime.now())

    return [m for m in Message.select().dicts()]
