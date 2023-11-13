FROM node:latest AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN mkdir /dbdata

RUN npm install -g pnpm

COPY . .

RUN pnpm install

RUN pnpm run build

EXPOSE 3333

CMD [ "pnpm", "run", "start:dev" ]