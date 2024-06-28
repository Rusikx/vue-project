import { Sequelize } from "sequelize"

import config from "./../config/db.config.ts"
import userModel from "./../models/user.model.ts"
import roleModel from "./../models/role.model.ts"
// import networksModel from "./../models/networks.model.ts"
import chargePointsModel from "./../models/charge_points.model.ts"
import connectorsModel from "./../models/connectors.model.ts"


const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = userModel(sequelize, Sequelize)
db.role = roleModel(sequelize, Sequelize)
// db.networks = networksModel(sequelize, Sequelize)
db.charge_points = chargePointsModel(sequelize, Sequelize)
db.connectors = connectorsModel(sequelize, Sequelize)

db.role.belongsToMany(db.user, {
  through: "user_roles"
})
db.user.belongsToMany(db.role, {
  through: "user_roles"
})

db.ROLES = ["user", "admin", "moderator"]

export default db