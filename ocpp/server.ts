const WebSocket = require("ws");
const url = require("url");
const { sendCommand } = require("./common/commands.ts");
// const NetworkService = require("./../api/services/network.service.ts");
require('dotenv').config();

const wsServer = new WebSocket.Server({ port: process.env.VITE_WS_PORT});

wsServer.on('connection', (wsClient, req) => {
  // wsClient.send('accepted');
  const queryParams = url.parse(req.url, true).query

  wsClient.on('close', function() {
    console.log('Пользователь отключился');
  });

  var timerRestart = 0;

  wsClient.on('message', function(message) {
    try {
      const data = { ... JSON.parse(message), ...queryParams };

      if (data.point) {
        const sendResponse = sendCommand(data);
        const response = JSON.parse(sendResponse);
        // console.log(sendResponse)
        // console.log(response)

        if (
          sendResponse !== null &&
          data.point === response[2].point
        ) {
          wsClient.send(sendResponse);
        }
      }
    } catch (error) {
      wsClient.status(500).send({ message: error.message });
    }
  });
});

console.log('Сервер запущен на ' + process.env.VITE_WS_PORT + ' порту');