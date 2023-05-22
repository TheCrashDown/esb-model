import json
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware

from base import BaseClient, call, logger

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
        super().handle_message(message)
        return message

    def create_message(self, message):
        logger.info(f"sending from {self.address} message {message}")

        logger.info(ESB_ADDRESS + "/send")

        logger.info(json.dumps(
                {
                    "message": message,
                    "address": self.address,
                    "format": self.format,
                }
            ))
        return call(
            ESB_ADDRESS + "/send",
            json.dumps(
                {
                    "message": message,
                    "address": self.address,
                    "format": self.format,
                }
            ),
        )


class Client2(BaseClient):
    def handle_message(self, message):
        super().handle_message(message)
        return message


class Client3(BaseClient):
    def handle_message(self, message):
        super().handle_message(message)
        return message


client1 = Client1(address="9001", name="server1", format="json")
client2 = Client2(address="9002", name="server2", format="json")
client3 = Client3(address="9003", name="server3", format="xml")

for client in [client1, client2, client3]:
    client.connect(ESB_ADDRESS)


@router1.post("/handle")
def handle1(data: dict):
    return client1.handle_message(data)

@router1.post("/send")
def send1(message: dict):
    logger.info("message")
    return client1.create_message(message)


@router2.post("/handle")
def handle2(data: dict):
    return client2.handle_message(data)


@router3.post("/handle")
def handle3(data: dict):
    return client3.handle_message(data)


app1.include_router(router1, prefix="")
app2.include_router(router2, prefix="")
app3.include_router(router3, prefix="")
