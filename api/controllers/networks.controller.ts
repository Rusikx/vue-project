const db = require("./../models/connect.models.ts");

// db.networks = require("./../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_point = require("./../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("./../models/connectors.model.ts")(db.sequelize, db.Sequelize);

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

exports.create = (req, res) => {
    const data = req.body[3];

    try {
        // Networks.create({
        //     name: "test",
        //     location: "test",
        //     is_active: false
        // }).then(network => {
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

                    // status: "test",
                    // vendor: data.chargePointVendor,
                    // location: data.chargeBoxSerialNumber,
                    // model: data.chargePointModel,
                    // serial_number: data.meterSerialNumber,
                    // ocpp_version: data.firmwareVersion,
                    // network_id: network.dataValues.id,
                    // // error_code: "",
                    // is_active: false
                }
            }).then(chargePointer => {
                Connectors.create({
                    connector_id: data.connectorId,
                    error_code: data.errorCode,
                    status: data.status,
                    vendor_id: data.vendorId,
                    vendor_error_code: data.vendorErrorCode,
                    charge_point_id: chargePointer[0].dataValues.id
                    // status: "test",
                    // charge_point_id: chargePointer[0].dataValues.id,
                    // // error_code: "",
                    // is_active: false
                })
            })
        // })
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}
// chargePointVendor: '',
// chargePointModel: '',
// chargeBoxSerialNumber: '192.168.1.127:443',
// chargePointSerialNumber: '5656',
// firmwareVersion: '140c10a-102104155118118-01043219-',
// iccid: '8931080019083732769',
// imsi: '204080819138795',
// meterSerialNumber: '181184951512',
// meterType: 'DC'

exports.all = async (req, res) => {
    try {
        const response = await Networks.findAll()

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.allCascade = async (req, res) => {
    try {
        const response = await Networks.findAll({
            attributes: [
                `id`,
                `name`,
                `location`,
                `is_active`
            ],
            include: [
                {
                    model: ChargePoint,
                    attributes: [
                        `id`,
                        `status`,
                        `vendor`,
                        `location`,
                        `model`,
                        `serial_number`,
                        `ocpp_version`,
                        `error_code`,
                        `is_active`,
                        `network_id`
                    ],
                    include: [
                        {
                            model: Connectors,
                            attributes: [
                                `id`,
                                `status`,
                                `charge_point_id`,
                                `error_code`,
                                `is_active`
                            ]
                        },
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
    try {
        const response = await ChargePoint.findAll({
            where: { is_active: false },
            order: [["createdAt", "DESC"]],
            limit: 1
        }).then(chargePointer => {
            if (chargePointer.length) {
                Networks.update(
                    { is_active: true },
                    {
                        where: { id: chargePointer[0].dataValues.network_id },
                    }
                )
                ChargePoint.update(
                    { is_active: true },                
                    {
                        where: { id: chargePointer[0].dataValues.id }
                    }
                )
            }
        })

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.deactivate = async (req, res) => {
    try {
        const response = await ChargePoint.findAll({
            where: { is_active: true },
            order: [["createdAt", "DESC"]],
            limit: 1
        }).then(chargePointer => {
            if (chargePointer.length) {
                Networks.update(
                    { is_active: false },
                    {
                        where: { id: chargePointer[0].dataValues.network_id },
                    }
                )
                ChargePoint.update(
                    { is_active: false },                
                    {
                        where: { id: chargePointer[0].dataValues.id }
                    }
                )
            }
        })

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}
