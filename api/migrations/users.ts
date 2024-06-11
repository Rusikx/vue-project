const db = require("./../models/connect.models.ts");
const bcrypt = require("bcryptjs");

db.user = require("../models/user.model.ts")(db.sequelize, db.Sequelize);
db.role = require("../models/role.model.ts")(db.sequelize, db.Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles"
});
db.user.belongsToMany(db.role, {
  through: "user_roles"
});

db.ROLES = ["user", "admin", "moderator"];

// const db = require("./../models/index.ts");
const Role = db.role;
const User = db.user;

db.sequelize.sync().then(() => {    
  User.findOne({
    where: {
      username: 'admin@mail.com'
    }
  }).then(user => {
    if (!user) {
      db.sequelize.sync({force: true}).then(() => {
        console.log('Drop and Resync Db');
        initial();
      })
    }
  });
})

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    // id: 1,
    username: "admin@mail.com",
    email: "admin@mail.com",
    password: bcrypt.hashSync("admin", 8)
  }).then(user => {
    user.setRoles([3])
  });
}