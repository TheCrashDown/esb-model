from models import Client, Message, Queue


class Broker:
    # ids of queued messages
    queue = None
    replic = None
    # ids of connected clients
    clients = []
    batch_mode = False
    batch_size = 0
    config = None

    def __init__(self):
        self.batch_size = 20
        self.queue = Queue.create()

    def get_clients(self):
        return self.clients

    def add_client(self, client):
        self.clients.append(client.id)

    def set_config(self, config):
        pass

    def trig_message_handling(self):
        if not self.batch_mode or len(self.queue.messages) >= self.batch_size:
            self.process_messages()

    def process_messages(self):
        # read config
        # send to reciever
        # delete from queue
        pass

    def recieve_messages(self, address, message, format):
        client = Client.select().where(Client.address == address)
        if not client.exists():
            client = Client.create(address=address, name=address)
        else:
            client = client.get()

        if not client.id in self.get_clients():
            self.add_client(client)

        msg = Message.create(
            content=message, sender=client, format=format, queue=self.queue
        )

        self.trig_message_handling()
