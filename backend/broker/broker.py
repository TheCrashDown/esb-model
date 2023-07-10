import json
from models import Client, Message, Queue
from .util import call


class Broker:
    """Main backend class, implementing message sending between clients"""

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
        """Get list of connected clients"""

        return self.clients

    def add_client(self, client):
        """Add new client to ESB"""

        clients = Client.select().where(Client.id << self.get_clients())
        addresses = [i["address"] for i in clients.dicts()] if clients.exists() else []

        if client.address not in addresses:
            self.clients.append(client.id)
            return {
                "success": True,
                "connected": client.address,
                "addresses": addresses,
            }
        return {"success": False, "error": "already connected"}

    def set_config(self, config):
        """Set new config"""

        self.config = config

    def trig_message_handling(self):
        """Trigger message processing, if conditions are met"""

        if not self.batch_mode or len(self.queue.messages) >= self.batch_size:
            self.process_messages()

    def transform_message(self, message, format1, format2):
        """Message transformation between formats"""
        # TODO: do message transformation
        pass

    def process_messages(self):
        """Sending messages according to configuration"""

        for message in self.queue.messages:
            if message.id in self.already_handled:
                continue
            cfg_sender = [i for i in self.config if i["from"] == message.sender.address]
            if len(cfg_sender) == 0:
                message.queue = None
                message.save()
                continue
            for cfg in cfg_sender:
                base = "http://host.docker.internal:"

                response = call(
                    base + cfg["to"] + "/handle",
                    json.dumps({"data": message.content}),
                )

                message.queue = None
                message.save()
                self.already_handled.append(message.id)
                self.recieve_messages(cfg["to"], response, "json")

    def recieve_messages(self, address, message, format):
        """Recieve message from clients"""

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
