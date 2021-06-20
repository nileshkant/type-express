FROM node as builder
WORKDIR /user/app
COPY package*.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz
RUN chmod 755 /usr/local/bin/dockerize
RUN npm run build

FROM node
WORKDIR /user/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /user/app/build ./build
COPY ormconfig.docker.json ./ormconfig.json
COPY .env .
EXPOSE 4000