const WebSocket = require("ws");
const { sendCommand } = require("./common/commands.ts");
// const NetworkService = require("./../api/services/network.service.ts");
require('dotenv').config();

const wsServer = new WebSocket.Server({ port: process.env.VITE_WS_PORT});

wsServer.on('connection', onConnect);

function onConnect(wsClient) {
    // wsClient.send('accepted');

    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });

    // var timerRestart = 0;

    wsClient.on('message', function(message) {
        try {
            // console.log('Пользователь отправил');
            const data = JSON.parse(message);
            // console.log(data);
            const sendResponse = sendCommand(data);
            // console.log(sendResponse)

            if (sendResponse !== null) {
                // NetworkService.create(data);
                wsClient.send(sendResponse);
            }
            // if (data[2] === "BootNotification") {
            //  const response = [3, data[1], {'status': 'Accepted', 'interval': 20, 'currentTime': currentDate}]
            //  console.log("BootNotification compleat")
            //  wsClient.send(JSON.stringify(response))
            // }
            //
            // if (data[2] === "Heartbeat") {
            //     const response2 = [3, data[1], {'currentTime': currentDate}]
            //     timerRestart++
            //     console.log("Time sended", timerRestart)
            //     wsClient.send(JSON.stringify(response2))
            // }

            // if (data[3] !== undefined) {
            //     console.log("meterValue", data[3])
            //     console.log("meterValue", data[3].meterValue)
            //     console.log("meterValue", data[3].meterValue[0])
            // }
        } catch (error) {
            // console.log('Ошибка', error);
        }
    });
}

console.log('Сервер запущен на ' + process.env.VITE_WS_PORT + ' порту');