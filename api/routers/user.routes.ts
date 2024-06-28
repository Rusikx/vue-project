import { Router } from 'express'
// import { verifyToken, isModerator, isAdmin } from "./../middleware/authJwt.ts"
import * as controller from "./../controllers/user.controller.ts"


const API_URL = "/api/test/"

let api = Router()

api.get(API_URL + "all", controller.allAccess)

api.get(
  API_URL + "user",
  // [verifyToken],
  controller.userBoard
)

api.get(
  API_URL + "mod",
  // [verifyToken, isModerator],
  controller.moderatorBoard
)

api.get(
  API_URL + "admin",
  // [verifyToken, isAdmin],
  controller.adminBoard
)

export default api
