import httpx
import asyncio


async def httpx_post(url, data):
    async with httpx.AsyncClient() as client:
        r = await client.get(url, data)
        return r.json()


def call(url, data):
    return asyncio.run(httpx_post(url, data))
