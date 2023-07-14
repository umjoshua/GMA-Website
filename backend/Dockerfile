FROM alpine

WORKDIR /app

RUN apk add nodejs npm

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 5000

CMD [ "node","index.js" ]