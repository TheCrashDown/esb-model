import json
from models import Client, Message, Queue
from .util import call


class Broker:
    # ids of queued messages
    queue = None
    replic = None
    # ids of connected clients
    clients = []
    batch_mode = False
    batch_size = 5
    config = []
    already_handled = []

    def __init__(self):
        self.batch_size = 20
        self.queue = Queue.create()

    def get_clients(self):
        return self.clients

    def add_client(self, client):
        clients = Client.select().where(Client.id << self.get_clients())
        addresses = [i["address"] for i in clients.dicts()] if clients.exists() else []

        if client.address not in addresses:
            self.clients.append(client.id)
            print(f"added {client.address}")
            return {
                "success": True,
                "connected": client.address,
                "addresses": addresses,
            }
        return {"success": False, "error": "already connected"}

    def set_config(self, config):
        print(f"set_config {config}")
        self.config = config

    def trig_message_handling(self):
        if not self.batch_mode or len(self.queue.messages) >= self.batch_size:
            self.process_messages()

    def transform_message(self, message, format1, format2):
        pass

    def process_messages(self):
        print(f"process_messages")
        print([i for i in self.queue.messages])
        for message in self.queue.messages:
            if message.id in self.already_handled:
                continue
            print(
                f"searching msg  {message.id} {message.content} {message.sender.address}"
            )
            cfg_sender = [i for i in self.config if i["from"] == message.sender.address]
            print(f"found configs {cfg_sender}")
            if len(cfg_sender) == 0:
                print(f"11 REMOVING {len(self.queue.messages)}")
                message.queue = None
                message.save()
                print(f"11 REMOVED {len(self.queue.messages)}")
                continue
            for cfg in cfg_sender:
                base = "http://host.docker.internal:"
                print(f'pr send {base + cfg["to"] + "/handle"} {message.content}')

                response = call(
                    base + cfg["to"] + "/handle",
                    json.dumps({"data": message.content}),
                )

                print(f"resp: {response}")
                # TODO: not only json
                print(f"22 REMOVING {len(self.queue.messages)}")
                message.queue = None
                message.save()
                self.already_handled.append(message.id)
                print(f"22 REMOVED {len(self.queue.messages)}")
                self.recieve_messages(cfg["to"], response, "json")

    def recieve_messages(self, address, message, format):
        print(f"recieve_message {address} {message}")
        client = Client.select().where(Client.address == address)
        if not client.exists():
            client = Client.create(address=address, name=address)
        else:
            client = client.get()

        if not client.id in self.get_clients():
            self.add_client(client)

        msg = Message.create(
            content=message.get("data"), sender=client, format=format, queue=self.queue
        )
        msg.save()

        self.trig_message_handling()
