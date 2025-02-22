module.exports = (sequelize, Sequelize) => {
    const Connectors = sequelize.define("connectors", {
        // id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     primaryKey: true
        // },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        },
        charge_point_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
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

    return Connectors;
};