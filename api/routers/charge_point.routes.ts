import { Router } from 'express'

import { verifyToken, isModerator, isAdmin } from "./../middleware/authJwt.ts"
import * as controller from "./../controllers/charge_point.controller.ts"
import * as controllerOut from "./../controllers/ws/charge_point.controller.ts"


const API_URL = "/api/charge-point/"

let api = Router()

api.post(
  API_URL + "all",
  // [verifyToken, isAdmin],
  controller.all
)
api.post(
  API_URL + "all-cascade",
  // [verifyToken, isAdmin],
  controller.allCascade
)
api.post(
  API_URL + "create",
  // [verifyToken, isAdmin],
  controller.create
)
api.get(
  API_URL + "activate",
  // [verifyToken, isAdmin],
  controller.activate
)
api.get(
  API_URL + "deactivate",
  // [verifyToken, isAdmin],
  controller.deactivate
)
api.post(
  API_URL + "heartbeat",
  // [verifyToken, isAdmin],
  controller.heartbeat
)

// For ws
api.post(
  API_URL + "restart-out",
  // [verifyToken, isAdmin],
  controllerOut.restart
)
api.post(
  API_URL + "reset-out",
  // [verifyToken, isAdmin],
  controllerOut.reset
)
api.post(
  API_URL + "heartbeat-out",
  // [verifyToken, isAdmin],
  controllerOut.heartbeat
)
api.get(
  API_URL + "data",
  // [verifyToken, isAdmin],
  controllerOut.data
)

export default api
