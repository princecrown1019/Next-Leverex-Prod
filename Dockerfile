FROM node:14-alpine as builder

ARG ENV="dev"
ENV ENV=$ENV

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN mv .env-docker .env

RUN yarn build:$ENV

## Final
#FROM nginx:1.17.0-alpine
#
#RUN rm -rf /etc/nginx/conf.d/*
#
#COPY --from=builder /app/build/ /usr/share/nginx/html/

CMD ["yarn", "start"]
