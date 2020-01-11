### STAGE 1: Build ###

FROM node:10.15.0 AS builder

WORKDIR /explorer

COPY ./package.json ./
COPY ./package-lock.json ./

RUN set -ex &&\
    npm -v &&\
    npm install

COPY ./ ./

RUN $(npm bin)/ng build --prod

### STAGE 2: Serve ###

FROM nginx:alpine as server

LABEL maintainer="Marc-Andre Daigneault <contact@the224.info>"

## Copy our default nginx config
COPY nginx.conf /etc/nginx/nginx.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /explorer/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]