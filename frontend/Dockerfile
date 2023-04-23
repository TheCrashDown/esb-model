FROM node:14-alpine as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true
