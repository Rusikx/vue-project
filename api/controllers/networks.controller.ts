const db = require("./../models/connect.models.ts");

db.networks = require("./../models/networks.model.ts")(db.sequelize, db.Sequelize);
db.charge_pointer = require("./../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
db.connectors = require("./../models/connectors.model.ts")(db.sequelize, db.Sequelize);

// db.networks.hasOne(db.charge_points, {
//     foreignKey: "network_id"
// });
// db.charge_points.belongsTo(db.networks);

const Networks = db.networks;
const ChargePointer = db.charge_pointer;
const Connectors = db.connectors;

exports.create = (req, res) => {
    const data = req.body[3];

    try {
        Networks.create({
            name: "test",
            location: "test",
            is_active: false
        }).then(network => {
            ChargePointer.create({
                status: "test",
                vendor: data.chargePointerVendor,
                location: "test",
                model: data.chargePointerModel,
                serial_number: data.chargePointerSerialNumber,
                ocpp_version: data.firmwareVersion,
                network_id: network.dataValues.id,
                // error_code: "",
                is_active: false
            }).then(chargePointer => {
                Connectors.create({
                    status: "test",
                    charge_point_id: chargePointer.dataValues.id,
                    // error_code: "",
                    is_active: false
                })
                // .this(data => {
                //     console.log('data last', data)
                //     res.send({ message: "Networks, ChargePointer and Connectors successfully!" });
                // })
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
        res.send([])
    };
}

exports.allCascade = async (req, res) => {
    try {
        const response = await Networks.findAll({
            // attributes: [
            //     `id`,
            //     `name`,
            //     `location`,
            //     `is_active`
            // ],
            include: ChargePointer
            // include: [
            //     {
            //         model: ChargePointer,
            //         association: "network_id"
            //         // attributes: [
            //         //     `status`,
            //         //     `vendor`,
            //         //     `location`,
            //         //     `model`,
            //         //     `serial_number`,
            //         //     `ocpp_version`,
            //         //     `network_id`
            //         // ]
            //     },
            // ]
        })

        res.send(response)
    } catch (err) {
        res.send([])
    };
}