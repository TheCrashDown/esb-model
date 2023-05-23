import httpx
import asyncio
import logging
import json

logging.basicConfig(
    filename="logs.txt",
    filemode="a",
    format="%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s",
    datefmt="%H:%M:%S",
    level=logging.INFO,
)


logger = logging.getLogger("clients")


async def httpx_post(url, data):
    async with httpx.AsyncClient() as client:
        r = await client.post(url, data=data)
        return r.json()


def call(url, data):
    return asyncio.run(httpx_post(url, data))


class BaseClient:
    def __init__(self, address, name="", format="json"):
        self.name = name
        self.address = address
        self.format = format

    def connect(self, esb_address):
        r = call(
            esb_address + "/connect",
            json.dumps(
                {
                    "name": self.name,
                    "address": self.address,
                    "format": self.format,
                }
            ),
        )
        logger.info(f"connect response: {r}")

    def handle_message(self, message: dict):
        logger.info(f"client {self.address} handling message: {message}")
        return message

    def create_message(self, message):
        return message
