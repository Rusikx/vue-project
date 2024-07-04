import { Request, Response, NextFunction } from 'express'
import { WebSocketServer } from "ws"
import url from "url"

import db from "./../../models/connect.models.ts"

import chargePointsModel from "./../../models/charge_points.model.ts"
import ChargePointClass from "./../../classes/ChargePointClass.ts"

db.charge_point = chargePointsModel(db.sequelize, db.Sequelize)

const ChargePoint = db.charge_point

const wsServerStart = (() => {
  return new WebSocketServer({ port: process.env.VITE_SERVER_WS_PORT})
})

const wsClientStart = ((point: string, command: string) => {
  return new WebSocket(process.env.VITE_WS_HOST + "?point=" + point + "&command=" + command)
})

const chargePointClass = new ChargePointClass()

export function restart(req: Request, res: Response) {
  const data = req.body

  try {
    const wsClient = wsClientStart(data.point, "restart")
    
    wsClient.on('open', () => {
        const response = [2, 'restart-' + data.point, 'Restart']
    
        wsClient.send(JSON.stringify(response))
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export function reset(req: Request, res: Response) {
  const data = req.body

  try {
    const wsClient = wsClientStart(data.point, "reset")
    
    wsClient.on('open', () => {
        const response = [2, 'reset-' + data.point, 'Reset']
    
        wsClient.send(JSON.stringify(response))
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export function heartbeat(req: Request, res: Response) {
  const data = req.body

  try {
    const wsServer = wsServerStart()

    wsServer.on('connection', (wsClient, req) => {
      const queryParams = url.parse(req.url, true).query

      wsClient.on('message', async (message) => {
        const params = { ... JSON.parse(message), ...queryParams }
  
        // if (data.point === params.point) {
        if (params.point) {
          let response = false

          switch (queryParams.command) {
            case "data":
              response = await chargePointClass.allCascade()
            break
            case "heartbeat":
              // console.log(111, data.point, params.point)
              response = await chargePointClass.activate(params)
            break
            case "close":
              wsClient.close()
            break
          }

          wsClient.send(JSON.stringify(response))
        }

        // if (queryParams.command === "data") {
        //   const response = await chargePointClass.allCascade()
  
        //   wsClient.send(JSON.stringify(response))
        // }
      })

      wsClient.on('close', async () => {
        // console.log(222, queryParams.point, queryParams.command)
        if (queryParams.command === "heartbeat" && queryParams.point) {
          // console.log(333)
          const response = chargePointClass.deactivate(queryParams)
  
          wsClient.send(JSON.stringify(response))
        }
      })
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export function data(req: Request, res: Response) {
  try {
    const wsServer = wsServerStart()

    wsServer.on('connection', (wsClient, req) => {
      wsClient.on('message', async () => {
        const response = await chargePointClass.allCascade()

        wsClient.send(JSON.stringify(response))
      })
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
