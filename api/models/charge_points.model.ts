module.exports = (sequelize, Sequelize) => {
    const ChargePoints = sequelize.define("charge_points", {
        // id: {
        //     type: Sequelize.STRING(20),
        //     allowNull: false,
        //     primaryKey: true
        // },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        vendor: {
            type: Sequelize.STRING,
            allowNull: true
        },
        location: {
            type: Sequelize.STRING,
            allowNull: true
        },
        model: {
            type: Sequelize.STRING,
            allowNull: true
        },
        serial_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        ocpp_version: {
            type: Sequelize.STRING,
            allowNull: false
        },
        network_id: {
            type: Sequelize.STRING,
            allowNull: false
        },
        error_code: {
            type: Sequelize.STRING,
            allowNull: true
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    });

    return ChargePoints;
};