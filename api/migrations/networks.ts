const db = require("./../models/connect.models.ts");

// db.networks = require("../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_point = require("../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("../models/connectors.model.ts")(db.sequelize, db.Sequelize);

// const db = require("./../models/index.ts");
// const Networks = db.networks;
const ChargePoint = db.charge_point;
const Connectors = db.connectors;

// Networks.hasOne(ChargePoint, {
//     foreignKey: "network_id"
// });
// ChargePoint.belongsTo(Networks);

ChargePoint.hasMany(Connectors, {
  foreignKey: "charge_point_id"
});
Connectors.belongsTo(ChargePoint);
