const config = require("./../config/db.config.ts");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.ts")(sequelize, Sequelize);
db.role = require("../models/role.model.ts")(sequelize, Sequelize);
db.networks = require("../models/networks.model.ts")(sequelize, Sequelize);
db.charge_points = require("../models/charge_points.model.ts")(sequelize, Sequelize);
db.connectors = require("../models/connectors.model.ts")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;