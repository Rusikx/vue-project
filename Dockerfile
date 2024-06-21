FROM node:18-alpine

WORKDIR /vue-project

COPY . .

# RUN mkdir -p /ocpp/backend
# RUN mkdir -p /ocpp/frontend

RUN npm install --production

CMD ["node", "/vue-project/server.ts"]

EXPOSE 3000