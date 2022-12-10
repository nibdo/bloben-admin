FROM node:16.18.1-bullseye-slim

WORKDIR /usr/app/tmp
ENV NODE_ENV development

COPY . ./
RUN npm run setup

ENV NODE_ENV production
RUN npm run build

WORKDIR /usr/app
RUN cp -r ./tmp/dist ./admin/

RUN rm -r ./tmp
