import db from "./../models/connect.models.ts"
import chargePointsModel from "./../models/charge_points.model.ts"
import connectorsModel from "./../models/connectors.model.ts"

// db.networks = require("../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_points = chargePointsModel(db.sequelize, db.Sequelize)
db.connectors = connectorsModel(db.sequelize, db.Sequelize)

// const Networks = db.networks
const ChargePoint = db.charge_point
const Connectors = db.connectors

// Networks.hasOne(ChargePoint, {
//     foreignKey: "network_id"
// })
// ChargePoint.belongsTo(Networks)

ChargePoint.hasMany(Connectors, {
  foreignKey: "charge_point_id"
})
Connectors.belongsTo(ChargePoint)

export default () => {}
