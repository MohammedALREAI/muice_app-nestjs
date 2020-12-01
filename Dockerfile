





FROM  node:latestbuilder
WORKDIR /app/music
COPY ./package*.json ./
COPY yarn.lock .
RUN yarn
COPY . .
RUN yarn prebuild && yarn build

EXPOSE 3000
CMD ["yarn", , "start:prod"]
