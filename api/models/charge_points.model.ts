module.exports = (sequelize, Sequelize) => {
  const ChargePoints = sequelize.define("charge_points", {
    // status: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // },
    charge_point_vendor: {
      type: Sequelize.STRING,
      allowNull: false
    },
    charge_point_model: {
      type: Sequelize.STRING,
      allowNull: false
    },
    charge_box_serial_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    charge_point_serial_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    firmware_version: {
      type: Sequelize.STRING,
      allowNull: false
    },
    iccid: {
      type: Sequelize.STRING,
      allowNull: false
    },
    imsi: {
      type: Sequelize.STRING,
      allowNull: false
    },
    meter_serial_number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    meter_type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    // location: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    // network_id: {
    //     type: Sequelize.INTEGER,
    //     allowNull: false
    // },
    // error_code: {
    //     type: Sequelize.STRING,
    //     allowNull: true
    // },
    is_active: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
  });

  return ChargePoints;
};