FROM node:12

WORKDIR /app

COPY src ./src
COPY package.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./

RUN yarn install

RUN yarn build

EXPOSE 8080

CMD [ "yarn", "prod" ]
