const db = require("./../models/connect.models.ts");

db.networks = require("../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_points = require("../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("../models/connectors.model.ts")(db.sequelize, db.Sequelize);

// db.networks.hasOne(db.charge_points, {
//     foreignKey: "network_id"
// });
// db.networks.belongsTo(db.charge_points);

// const db = require("./../models/index.ts");
const networks = db.networks;

// chargePointerVendor: '' // vendor
// chargePointerModel: '' // model
// chargeBoxSerialNumber: '192.168.1.187:9000' // 
// chargePointerSerialNumber: '' // serial_number
// firmwareVersion: '' // ocpp_version
// iccid: ''
// imsi: ''
// meterSerialNumber: ''
// meterType: ''