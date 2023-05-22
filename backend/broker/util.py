import httpx
import asyncio


async def httpx_post(url, data):
    async with httpx.AsyncClient() as client:
        print(f"deb {url} {data}")
        r = await client.post(url, data=data)
        print(f"debb {r} {r.json()}")
        return r.json()


def call(url, data):
    return asyncio.run(httpx_post(url, data))
