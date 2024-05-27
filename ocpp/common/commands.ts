// const NetworkService = require("./../../api/services/network.service.ts");
const { OCPPDate } = require( "./help-functions.ts");
const axios = require("axios");
require('dotenv').config();

// /**
//  * Send Command to OCPP Central System
//  * @param { string } command 
//  * @param { string } key
//  */

exports.sendCommand = (data) => {
  const indexCommand = 3;
  const content = data[3];
  const command = data[2];
  const key = data[1];
  let message;

  switch (command) {
    case "BootNotification": // BootNotification
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted",
            "interval": 30,
            "currentTime": OCPPDate()
          }
      ];

      if (content && content.iccid) {
        // const classNetworkService = new NetworkService();
        // NetworkService.create(content);
        // (async () => {
        //   let response = async () => await axios.post(process.env.VITE_SERVER_HOST + "/api/network/create", data);

        //   response.then((res) => {
        //     console.log(res);
        //   }).catch((error) => {
        //     console.log(error);
        //   })
        // })
        try {
          axios.post(process.env.VITE_SERVER_HOST + "/api/network/create", data);
        } catch (err) {
          console.log(err);
        }
      }
      break;
    case "Restart": // Heartbeat
      message = [
          indexCommand,
          key,
          {
            "currentTime": OCPPDate()
          }
      ]
      break;
    case "CancelReservation":
      message = [
          indexCommand,
          key,
          {
            // "reservationId": 1
            "status": "Accepted"
          }
      ]
      break;
    case "ChangeAvailability":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "connectorId": 1,
            // "type": ""
          }
      ]
      break;
    case "ChangeConfiguration":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "key": "",
            // "value": ""
          }
      ]
      break;
    case "ClearCache":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
          }
      ]
      break;
    case "ClearChargingProfile":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "id": 1,
            // "connectorId": 1,
            // "chargingProfilePurpose": "",
            // "stackLevel": 1
          }
      ]
      break;
    case "DataTransfer":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted",
            "data": ""
            // "vendorId": ",
            // "messageId": ""
            // "data": ""
          }
      ]
      break;
    case "DiagnosticsStatusNotification":
      message = [
          indexCommand,
          key,
          {
            // "status": "Accepted"
          }
      ]
      break;
    case "FirmwareStatusNotification":
      message = [
          indexCommand,
          key,
          {
            // "status": "Accepted"
          }
      ]
      break;
    case "GetCompositeSchedule":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted",
            "connectorId": 1,
            "scheduleStart": "datetime",
            "chargingSchedule": ""
            // "connectorId": 1,
            // "duration": 1,
            // "chargingRateUnit": ""
          }
      ]
      break;
    case "GetConfiguration":
      message = [
          indexCommand,
          key,
          {
            "configurationKey": "",
            "unknownKey": ""
            // "key": ""
          }
      ]
      break;
    case "GetDiagnostics":
      message = [
          indexCommand,
          key,
          {
            "fileName": ""
            // "location": "",
            // "retries": 1,
            // "retryInterval": 1,
            // "startTime": "datetime",
            // "stopTime": "datetime"
          }
      ]
      break;
    case "GetLocalListVersion":
      message = [
          indexCommand,
          key,
          {
            "listVersion": 1
          }
      ]
      break;
    case "Heartbeat":
      message = [
          indexCommand,
          key,
          {
            "currentTime": "datetime"
          }
      ]
      break;
    case "MeterValues":
      message = [
          indexCommand,
          key,
          {
            // "connectorId": 1
            // "transactionId": 1
            // "meterValue": ""
          }
      ]
      break;
    case "RemoteStartTransaction":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "connectorId": 1,
            // "idTag": "",
            // "chargingProfile": ""
          }
      ]
      break;
    case "RemoteStopTransaction":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "transactionId": 1
          }
      ]
      break;
    case "ReserveNow":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "connectorId": 1,
            // "expiryDate": "datetime",
            // "idTag": "",
            // "parentIdTag": "",
            // "reservationId": 1
          }
      ]
      break;
    case "Reset":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "type": "Hard"
          }
      ]
      break;
    case "SendLocalList":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "listVersion": 1,
            // "localAuthorizationList": "",
            // "updateType": ""
          }
      ]
      break;
    case "SetChargingProfile":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "connectorId": 1,
            // "csChargingProfiles": ""
          }
      ]
      break;
    case "StartTransaction":
      message = [
          indexCommand,
          key,
          {
            "idTagInfo": "",
            "transactionId": 1
            // "connectorId": 1,
            // "idTag": "",
            // "meterStart": 1,
            // "reservationId": 1,
            // "timestamp": "datetime"
          }
      ]
      break;
    case "StatusNotification":
      message = [
          indexCommand,
          key,
          {
            // "connectorId": 1,
            // "errorCode": "",
            // "info": "",
            // "status": "",
            // "timestamp": "datetime",
            // "vendorId": "",
            // "vendorErrorCode": ""
          }
      ]
      break;
    case "StopTransaction":
      message = [
          indexCommand,
          key,
          {
            "idTagInfo": ""
            // "idTag": "",
            // "meterStop": 1,
            // "timestamp": "datetime",
            // "transactionId": 1,
            // "reason": "",
            // "transactionData": ""
          }
      ]
      break;
    case "TriggerMessage":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "requestedMessage": "",
            // "connectorId": 1
          }
      ]
      break;
    case "UnlockConnector":
      message = [
          indexCommand,
          key,
          {
            "status": "Accepted"
            // "connectorId": 1
          }
      ]
      break;
    case "UpdateFirmware":
      message = [
          indexCommand,
          key,
          {
            // "location": "",
            // "connectorId": 1,
            // "retrieveDate": "dateTime",
            // "retryInterval": 1
          }
      ]
      break;
    /*case "Heartbeat":
      message = {}
      break;
    case "BootNotification":
      message = metaData.bootNotification
      break;
    case "Authorize":
      message = { idTag: metaData.RFIDTag }
      break;
    case "StatusNotification":
      message = {
        connectorId: metaData.connectorId,
        status: metaData.status,
        errorCode: "NoError",
        info: "",
        timestamp: OCPPDate(new Date()),
        vendorId: "",
        vendorErrorCode: ""
      }
      break;
    case "StartTransaction":
      message = {
        connectorId: metaData.connectorId,
        idTag: metaData.idTag,
        meterStart: metaData.startMeterValue,
        timestamp: OCPPDate(new Date()),
        // reservationId: ""
      }
      break;
    case "StopTransaction":
      message = {
        // idTag: "",
        meterStop: metaData.currentMeterValue,
        timestamp: OCPPDate(new Date()),
        transactionId: metaData.transactionId,
        reason: metaData.stopReason,
        // transactionData: ""
      }
      break;
    case "MeterValues":
      message = {
        connectorId: metaData.connectorId,
        transactionId: metaData.transactionId,
        meterValue: [
          {
            timestamp: OCPPDate(new Date()),
            sampledValue: [
              { measurand: "Voltage", phase: "L1", unit: "V", value: "222" },
              { measurand: "Voltage", phase: "L2", unit: "V", value: "223" },
              { measurand: "Voltage", phase: "L3", unit: "V", value: "223" },
              { measurand: "Current.Import", phase: "L1", unit: "A", value: "0" },
              { measurand: "Current.Import", phase: "L2", unit: "A", value: "0" },
              { measurand: "Current.Import", phase: "L3", unit: "A", value: "0" },
              { measurand: "Energy.Active.Import.Register", unit: "Wh", value: metaData.currentMeterValue.toString() },
              { measurand: "Power.Active.Import", unit: "W", value: "3290" }
            ]
          }
        ]
      }
      break;
    case "DiagnosticsStatusNotification":
      message = { status: metaData.diagnosticStatus }
      break;
    case "FirmwareStatusNotification":
      message = { status: metaData.firmWareStatus }
      break;*/
    default:
      return null
  }

  return JSON.stringify(message)
}