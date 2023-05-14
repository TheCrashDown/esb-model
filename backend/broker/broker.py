from models import Client, Message


class Broker:
    # ids of stored messages
    messages = []
    # ids of connected clients
    clients = []
    
    config = None

    def __init__(self):
        pass

    def get_clients(self):
        return self.clients

    def add_client(self, client):
        self.clients.append(client.id)

    def set_config(self, config):
        pass
