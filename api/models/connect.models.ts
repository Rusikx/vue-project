import { Sequelize } from "sequelize"
import config from "./../config/db.config.ts"

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
    },
    logging: false
  }
)

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

export default db