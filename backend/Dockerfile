FROM alpine

WORKDIR /app

RUN apk update

RUN apk add nodejs npm

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node","index.js" ]