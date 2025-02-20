FROM node:20.11.1-alpine3.19

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm install
COPY ./ ./
COPY ./.env.production ./.env

RUN npm run build
EXPOSE 3000

#USER node
CMD [ "npm", "start" ]