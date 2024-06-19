const WebSocket = require("ws");
const { OCPPDate, getId } = require( "./common/help-functions.ts");
require('dotenv').config();

const chargePointSerialNumber = "5656"

const wsClient = new WebSocket(process.env.VITE_WS_HOST + "?point=" + chargePointSerialNumber);

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
        active = false;

        wsClient.send(JSON.stringify([2, getId(), 'BootNotification', {
            chargePointVendor: '',
            chargePointModel: '',
            chargeBoxSerialNumber: '192.168.1.127:443', // '192.168.1.187:9000'
            chargePointSerialNumber: chargePointSerialNumber, // '5656', // '000000000'
            firmwareVersion: '140c10a-102104155118118-01043219-',
            iccid: '8931080019083732769',
            imsi: '204080819138795',
            meterSerialNumber: '181184951512',
            meterType: 'DC'
        }]));
        wsClient.send(JSON.stringify([2, getId(), 'StatusNotification', {
            connectorId: 0,
            errorCode: 'NoError',
            status: 'Available',
            // timestamp: '2024-05-30T14:38:26.002Z',
            vendorId: '',
            vendorErrorCode: '0x0000000000000000'
        }]));
        wsClient.send(JSON.stringify([2, getId(), 'StatusNotification', {
            connectorId: 1,
            errorCode: 'NoError',
            status: 'Available',
            // timestamp: '2024-05-30T14:38:26.002Z',
            vendorId: '',
            vendorErrorCode: '0x0000000000000000'
        }]));
        // console.log('BootNotification data');

        setTimeout(() => {
            let i = 0;
            while (i < 1) {
                (function(i) {
                    setTimeout(() => {
                        const response = [2, getId(), 'Heartbeat', {}]

                        wsClient.send(JSON.stringify(response));
                    }, 1000 * i)
                })(i++)
            }
        }, 1000)
    }
});

wsClient.on('close', () => {
    console.log('Disconnected from server');
});

// [  2,
//     'a90f5573-e3bb-4d9f-8201-9f1132d6ccb6',  'BootNotification',
//     {
//       chargePointVendor: '',
//       chargePointModel: '',
//       chargeBoxSerialNumber: '192.168.1.127:443',
//       chargePointSerialNumber: '5656',
//       firmwareVersion: '140c10a-102104155118118-01043219-',
//       iccid: '8931080019083732769',
//       imsi: '204080819138795',
//       meterSerialNumber: '181184951512',
//       meterType: 'DC'
//     }]
//   [  2,
//     '82b9e513-929d-4477-b0e9-862977911bf4',  'StatusNotification',
//     {
    //   connectorId: 0,
    //   errorCode: 'NoError',
    //   status: 'Available',
    //   timestamp: '2024-05-30T14:38:26.002Z',
    //   vendorId: '',
    //   vendorErrorCode: '0x0000000000000000'
//     }
//   ][
//     2,  '1068ec1e-9b0a-42fa-b899-68e1443609d8',
//     'StatusNotification',  {
//       connectorId: 1,    errorCode: 'NoError',
//       status: 'Available',    timestamp: '2024-05-30T14:38:26.004Z',
//       vendorId: '',    vendorErrorCode: '0x0000000000000000'
//     }]
//   [  2,
//     '86c399e9-cf50-416d-a36e-b544c103cc02',  'StatusNotification',
//     {    connectorId: 2,
//       errorCode: 'NoError',    status: 'Available',
//       timestamp: '2024-05-30T14:38:26.004Z',    vendorId: '',
//       vendorErrorCode: '0x0000000000000000'  }
//   ][
//     2,  '0fb4bcac-fb13-42a8-88e9-2c819944648d',
//     'StatusNotification',  {
//       connectorId: 3,    errorCode: 'NoError',
//       status: 'Available',    timestamp: '2024-05-30T14:38:26.006Z',
//       vendorId: '',    vendorErrorCode: '0x0000000000000000'
//     }]
//   [  2,
//     '1f9005cc-25e4-4826-a8dc-73824e91b117',  'StatusNotification',
//     {    connectorId: 4,
//       errorCode: 'NoError',    status: 'Available',
//       timestamp: '2024-05-30T14:38:26.007Z',    vendorId: '',
//       vendorErrorCode: '0x0000000000000000'  }
//   ][ 2, '759eb7e8-6482-46b7-974e-587f7a0b04b5', 'Heartbeat', {} ]
//   [ 2, '8b772501-c3e0-400d-93ec-026ab65f8c14', 'Heartbeat', {} ][ 2, 'f0e55ae7-42cb-4b0f-b89b-366bf00edc47', 'Heartbeat', {} ]