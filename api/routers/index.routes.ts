import { Router } from 'express'

import auth from './auth.routes.ts'
import user from './user.routes.ts'
// const network = require('./network.routes.ts');
import chargePoint from './charge_point.routes.ts'
import connector from './connector.routes.ts'


let api = Router()

api.get('/api', (req, res) => {
  res.json({ message: "Welcome to application." })
})

api.use(auth)
api.use(user)
api.use(chargePoint)
api.use(connector)

export default api