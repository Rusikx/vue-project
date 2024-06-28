import { Router } from 'express'
// import { verifySignUp } from "./../middleware/verifySignUp.ts"
import * as controller from "./../controllers/auth.controller.ts"


const API_URL = "/api/auth/"

let api = Router()

api.post(
  API_URL + "signup",
  // [
  //     verifySignUp.checkDuplicateUsernameOrEmail,
  //     verifySignUp.checkRolesExisted
  // ],
  controller.signup
)

api.post(API_URL + "signin", controller.signin)

export default api
