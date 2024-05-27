module.exports = (sequelize, Sequelize) => {
    const Networks = sequelize.define("networks", {
        // id: {
        //     type: Sequelize.STRING(20),
        //     allowNull: false,
        //     primaryKey: true
        // },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        }
    });

    return Networks;
};