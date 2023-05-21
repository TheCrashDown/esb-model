# !/usr/bin/bash

pkill gunicorn

gunicorn -k uvicorn.workers.UvicornWorker test_clients:app1 --bind=127.0.0.1:9001 --daemon
gunicorn -k uvicorn.workers.UvicornWorker test_clients:app2 --bind=127.0.0.1:9002 --daemon
gunicorn -k uvicorn.workers.UvicornWorker test_clients:app3 --bind=127.0.0.1:9003 --daemon
