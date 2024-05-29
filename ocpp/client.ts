const WebSocket = require("ws");
const { OCPPDate, getId } = require( "./common/help-functions.ts");
require('dotenv').config();

const wsClient = new WebSocket("ws://localhost:" + process.env.VITE_WS_PORT);

wsClient.on('open', () => {
    console.log('Connected to server');

    const response = [3, getId(), 'BootNotification']

    wsClient.send(JSON.stringify(response));
});

var active = true;

wsClient.on('message', (message) => {
    console.log(`Received message from server: ${message}`);
    const data = JSON.parse(message);

    if (data[2].status === 'Accepted' && active) {
        // wsClient.send(JSON.stringify([2, getId(), 'BootNotification', {
        //     chargePointerVendor: 'test',
        //     chargePointerModel: 'test',
        //     chargeBoxSerialNumber: '192.168.1.187:9000',
        //     chargePointerSerialNumber: '000000000',
        //     firmwareVersion: '140c10a-102104184155118118-01043219',
        //     iccid: '8931080019083732769',
        //     imsi: '204080819138795',
        //     meterSerialNumber: '181184951512',
        //     meterType: 'DC'
        // }]));
        active = false;
        // console.log('BootNotification data');

        let i = 0;
        while (i < 10) {
            (function(i) {
                setTimeout(() => {
                    const response = [2, getId(), 'Heartbeat', {}]

                    wsClient.send(JSON.stringify(response));
                }, 1000 * i)
            })(i++)
        }
    }
});

wsClient.on('close', () => {
    console.log('Disconnected from server');
});