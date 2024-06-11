module.exports = (sequelize, Sequelize) => {
  const Connectors = sequelize.define("connectors", {
    connector_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    error_code: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vendor_id: {
      type: Sequelize.STRING,
      allowNull: false
    },
    vendor_error_code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // charge_point_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // is_active: {
    //     type: Sequelize.BOOLEAN,
    //     allowNull: true
    // }
  });

  return Connectors;
};