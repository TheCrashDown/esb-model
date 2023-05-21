from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from base import BaseClient

app1 = FastAPI()
app2 = FastAPI()
app3 = FastAPI()

router1 = APIRouter()
router2 = APIRouter()
router3 = APIRouter()

origins = ["*"]

for app in [app1, app2, app3]:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

ESB_ADDRESS = "http://127.0.0.1:8000"


class Client1(BaseClient):
    def handle_message(self, message):
        return message


class Client2(BaseClient):
    def handle_message(self, message):
        return message


class Client3(BaseClient):
    def handle_message(self, message):
        return message


client1 = Client1(address=9001, name="server1", format="json")
client2 = Client2(address=9002, name="server2", format="json")
client3 = Client3(address=9003, name="server3", format="xml")


@router1.post("/handle")
def handle1(message):
    return client1.handle_message(message)


@router2.post("/handle")
def handle2(message):
    return client2.handle_message(message)


@router3.post("/handle")
def handle3(message):
    return client3.handle_message(message)


app1.include_router(router1, prefix="")
app2.include_router(router2, prefix="")
app3.include_router(router3, prefix="")
