#needs standard input, output, error streams and tty attached
# to run the container-> docker run --rm -it --name ctype ctype
FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm install

ENTRYPOINT [ "./src/cli.js" ]
