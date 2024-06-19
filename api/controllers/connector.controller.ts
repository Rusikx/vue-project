const db = require("./../models/connect.models.ts");

db.charge_point = require("./../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("./../models/connectors.model.ts")(db.sequelize, db.Sequelize);

const { STATUS_AVAILABLE } = require("./../constans/index.ts");

// const Networks = db.networks;
const ChargePoint = db.charge_point;
const Connectors = db.connectors;

ChargePoint.hasMany(Connectors, {
  foreignKey: "charge_point_id"
});
Connectors.belongsTo(ChargePoint);

exports.create = async (req, res) => {
  const data = req.body[3];

  try {
    const response = await ChargePoint.findOne({
      where: {
        charge_point_serial_number: req.body.point
      }
    }).then(chargePoint => {
      return Connectors.findOrCreate({
        where: {
          connector_id: data.connectorId || 0
        },
        defaults: {
          connector_id: data.connectorId || 0,
          error_code: data.errorCode || "NoError",
          status: data.status || STATUS_AVAILABLE,
          vendor_id: data.vendorId || '',
          vendor_error_code: data.vendorErrorCode || "",
          charge_point_id: chargePoint.dataValues.id

          // status: "test",
          // charge_point_id: chargePointer[0].dataValues.id,
          // // error_code: "",
          // is_active: false
        }
      })
    })

    res.send(response)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}

exports.all = async (req, res) => {
  try {
    const response = await Connectors.findAll()

    res.send(response)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}

// exports.active = async (req, res) => {
//   try {
//     const response = await Connectors.findAll()

//     res.send(response)
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   };
// }
