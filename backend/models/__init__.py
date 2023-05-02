import os
import peewee
import psycopg2

DB_HOST=os.environ.get('DB_HOST')
DB_PORT=os.environ.get('DB_PORT')
DB_NAME=os.environ.get('DB_NAME')
DB_USER=os.environ.get('DB_USER')
DB_PASS=os.environ.get('DB_PASS')

db = peewee.PostgresqlDatabase(DB_NAME, user=DB_USER, password=DB_PASS, host=DB_HOST, port=DB_PORT)

class BaseModel(peewee.Model):
    class Meta:
        database = db

class Message(BaseModel):

    content = peewee.TextField()

    class Meta:
        db_table = 'message'

Message.create_table()
