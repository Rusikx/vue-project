import { Router } from 'express'

import { verifyToken, isModerator, isAdmin } from "./../middleware/authJwt.ts"
import * as controller from "./../controllers/connector.controller.ts"


const API_URL = "/api/connector/"

let api = Router()

api.post(
  API_URL + "create",
  // [verifyToken, isAdmin],
  controller.create
)

api.get(
  API_URL + "all",
  // [verifyToken, isAdmin],
  controller.all
)

export default api