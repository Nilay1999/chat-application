FROM node:latest

RUN mkdir -p /server/src

WORKDIR /server/src

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD  ["npm","start"]

