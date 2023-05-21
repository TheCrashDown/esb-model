import httpx
import asyncio


async def httpx_post(url, data):
    async with httpx.AsyncClient() as client:
        r = await client.get(url, data)
        return r.json()


def call(url, data):
    return asyncio.run(httpx_post(url, data))


class BaseClient:
    def __init__(self, address, name=""):
        self.name = name
        self.address = address

    def connect(self, esb_address):
        r = call(
            esb_address + "/connect",
            {
                "name": self.name,
                "address": self.address,
            },
        )
        print(r)

    def handle_message(self, message):
        pass
