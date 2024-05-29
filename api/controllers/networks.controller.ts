const db = require("./../models/connect.models.ts");

db.networks = require("./../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_point = require("./../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("./../models/connectors.model.ts")(db.sequelize, db.Sequelize);

const Networks = db.networks;
const ChargePoint = db.charge_point;
const Connectors = db.connectors;

Networks.hasOne(ChargePoint, {
    foreignKey: "network_id"
});
ChargePoint.belongsTo(Networks);

ChargePoint.hasMany(Connectors, {
    foreignKey: "charge_point_id"
});
Connectors.belongsTo(ChargePoint);

exports.create = (req, res) => {
    const data = req.body[3];

    try {
        Networks.create({
            name: "test",
            location: "test",
            is_active: false
        }).then(network => {
            ChargePoint.findOrCreate({
                where: { serial_number: data.chargePointerSerialNumber },
                defaults: {
                    status: "test",
                    vendor: data.chargePointerVendor,
                    location: "test",
                    model: data.chargePointerModel,
                    serial_number: data.chargePointerSerialNumber,
                    ocpp_version: data.firmwareVersion,
                    network_id: network.dataValues.id,
                    // error_code: "",
                    is_active: false
                }
            }).then(chargePointer => {
                Connectors.create({
                    status: "test",
                    charge_point_id: chargePointer[0].dataValues.id,
                    // error_code: "",
                    is_active: false
                })
            })
        })
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

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
        console.log(1)
        const response = await Networks.update(
            {
                where: { is_active: false },
                limit: 1,
                order: [["createdAt", "DESC"]]
            },
            { is_active: true }
        ).then(network => {
            console.log(2)
            ChargePoint.update(
                {
                    where: { network_id: network.id }
                },
                { is_active: true }
            )
        })
        console.log(3)

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}

exports.deactivate = async (req, res) => {
    try {
        const response = await Networks.update(
            {
                where: { is_active: true },
                limit: 1,
                order: [["createdAt", "DESC"]]
            },
            { is_active: false }
        ).then(network => {
            ChargePoint.update(
                {
                    where: { network_id: network.id }
                },
                { is_active: false }
            )
        })

        res.send(response)
    } catch (err) {
        res.status(500).send({ message: err.message });
    };
}
