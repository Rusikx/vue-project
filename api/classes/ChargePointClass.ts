import { Request, Response, NextFunction } from 'express'
import { WebSocket } from "ws"
import url from "url"

import db from "./../models/connect.models.ts"
import chargePointsModel from "./../models/charge_points.model.ts"
import connectorsModel from "./../models/connectors.model.ts"
import { STATUS_AVAILABLE, STATUS_UNAVAILABLE } from "./../constans/index.ts"

db.charge_point = chargePointsModel(db.sequelize, db.Sequelize)
db.connectors = connectorsModel(db.sequelize, db.Sequelize)

const ChargePoint = db.charge_point
const Connectors = db.connectors

ChargePoint.hasMany(Connectors, {
  foreignKey: "charge_point_id"
})
Connectors.belongsTo(ChargePoint)

// const wsServerStart = (() => {
//   return new WebSocket.Server({ port: process.env.VITE_SERVER_WS_PORT})
// })

const wsClientStart = ((point: string, command: string) => {
  return new WebSocket(process.env.VITE_WS_HOST + "?point=" + point + "&command=" + command)
})

class ChargePointClass {
  create(data) {
    try {
      return ChargePoint.findOrCreate({
        where: {
          charge_point_serial_number: data.point
        },
        defaults: {
          charge_point_vendor: data.chargePointVendor,
          charge_point_model: data.chargePointModel,
          charge_box_serial_number: data.chargeBoxSerialNumber,
          charge_point_serial_number: data.chargePointSerialNumber,
          firmware_version: data.firmwareVersion,
          iccid: data.iccid,
          imsi: data.imsi,
          meter_serial_number: data.meterSerialNumber,
          meter_type: data.meterType,
          is_active: false,
        }
      })
    } catch (err) {
       return { message: err.message }
    }
  }

  all() {
    try {
      return ChargePoint.findAll()
    } catch (err) {
      return { message: err.message }
    }
  }
  
  allCascade() {
    try {
      return ChargePoint.findAll({
        attributes: [
          `id`,
          `charge_point_vendor`,
          `charge_point_model`,
          `charge_box_serial_number`,
          `charge_point_serial_number`,
          `firmware_version`,
          `iccid`,
          `imsi`,
          `meter_serial_number`,
          `meter_type`,
          `is_active`,
        ],
        include: [{
          model: Connectors,
          attributes: [
            `id`,
            `connector_id`,
            `error_code`,
            `status`,
            `vendor_id`,
            `vendor_error_code`,
            `charge_point_id`,
          ]
        }]
      })
    } catch (err) {
      return { message: err.message }
    }
  }

  activate(data) {
    try {
      return ChargePoint.update(
        // { status: STATUS_AVAILABLE },
        { is_active: true },
        { where: { charge_point_serial_number: data.point } }
      )
    } catch (err) {
      return { message: err.message }
    }
  }
  
  deactivate(data) {
    try {
      return ChargePoint.update(
        // { status: STATUS_UNAVAILABLE },
        { is_active: false },
        { where: { charge_point_serial_number: data.point } }
      )
    } catch (err) {
      return { message: err.message }
    }
  }

  // WS
  heartbeat(req: Request, res: Response) {
    const data = req.body
  
    try {
      const wsClient = wsClientStart(data.point, "heartbeat")
      
      wsClient.on('open', () => {
          const response = [2, 'heartbeat-' + data.point, 'Heartbeat', data]
      
          wsClient.send(JSON.stringify(response))
      })
  
      res.send(true)
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }

  async dataAllCascade(req: Request, res: Response) {
    let response = []

    try {
      const wsClient = wsClientStart('', "data")
      
      wsClient.on('open', () => {
          const query = [2, 'data-0', 'Data']
          wsClient.send(JSON.stringify(query))
      })

      await wsClient.on('message', (message) => {
        response = message
      })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }

    return response
  }
}

export default ChargePointClass
