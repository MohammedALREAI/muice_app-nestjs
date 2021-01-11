FROM node:alpine


WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install

CMD ["node", "dist/server.js"]
EXPOSE 3000


