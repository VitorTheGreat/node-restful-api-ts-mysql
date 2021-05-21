FROM node:14

WORKDIR /src

COPY /package.json .

RUN yarn

COPY /src .

EXPOSE 1337

CMD ["yarn", "dev"]