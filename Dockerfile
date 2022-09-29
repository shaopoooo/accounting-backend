FROM node:16-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-pip make g++

COPY package.json .
RUN yarn install

EXPOSE 8084

CMD yarn dev

