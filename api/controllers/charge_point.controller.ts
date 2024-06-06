const db = require("./../models/connect.models.ts");

db.charge_point = require("./../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("./../models/connectors.model.ts")(db.sequelize, db.Sequelize);

const { STATUS_AVAILABLE, STATUS_UNAVAILABLE } = require("./../../api/constans/index.ts")

const ChargePoint = db.charge_point;
const Connectors = db.connectors;

ChargePoint.hasMany(Connectors, {
    foreignKey: "charge_point_id"
});
Connectors.belongsTo(ChargePoint);

exports.create = (req, res) => {
    const data = req.body[3];

    try {
        ChargePoint.findOrCreate({
            where: {
                charge_point_serial_number: data.chargePointSerialNumber
            },
            defaults: {
                charge_point_vendor: data.chargePointVendor,
                charge_point_model: data.chargePointModel,
                charge_box_serial_number: data.chargeBoxSerialNumber,
                charge_point_serial_number: data.chargePointSerialNumber,
                firmware_version: data.firmwareVersion,
                iccid: data.iccid,
                imsi: data.imsi,
                meter_serial_number: data.meterSerialNumber,
                meter_type: data.meterType,
            }
        }).then(chargePointer => {
            Connectors.create({
                connector_id: data.connectorId,
                error_code: data.errorCode,
                status: data.status,
                vendor_id: data.vendorId,
                vendor_error_code: data.vendorErrorCode,
                charge_point_id: chargePointer[0].dataValues.id
            })
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.all = async (req, res) => {
    try {
        const response = await ChargePoint.findAll()

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.allCascade = async (req, res) => {
    try {
        const response = await ChargePoint.findAll({
            attributes: [
                `id`,
                `charge_point_vendor`,
                `charge_point_model`,
                `charge_box_serial_number`,
                `charge_point_serial_number`,
                `firmware_version`,
                `iccid`,
                `imsi`,
                `meter_serial_number`,
                `meter_type`,
            ],
            include: [
                {
                    model: Connectors,
                    attributes: [
                        `id`,
                        `connector_id`,
                        `error_code`,
                        `status`,
                        `vendor_id`,
                        `vendor_error_code`,
                        `charge_point_id`,
                    ]
                },
            ]
        })

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.activate = async (req, res) => {
    const data = req.body[3];

    try {
        const response = await ChargePoint.update(
            { status: STATUS_AVAILABLE },                
            { where: { charge_point_serial_number: data.point } }
        )

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.deactivate = async (req, res) => {
    const data = req.body[3];

    try {
        const response = await ChargePoint.update(
            { status: STATUS_UNAVAILABLE },                
            { where: { charge_point_serial_number: data.point } }
        )

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}
