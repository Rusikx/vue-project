import { Request, Response, NextFunction } from 'express'
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import db from "./../models/connect.models.ts"
import config from "./../config/auth.config.ts"
import userModel from "./../models/user.model.ts"
import roleModel from "./../models/role.model.ts"


db.user = userModel(db.sequelize, db.Sequelize)
db.role = roleModel(db.sequelize, db.Sequelize)

// db.role.belongsToMany(db.user, {
//   through: "user_roles"
// })
// db.user.belongsToMany(db.role, {
//   through: "user_roles"
// })

// db.ROLES = ["user", "admin", "moderator"]

// const User = db.user
// const Role = db.role

// const Op = db.Sequelize.Op

/**	Creates a callback that proxies node callback style arguments to an Express Response object.
 *	@param { Request } req	Express HTTP Request
 *	@param { Response } res	Express HTTP Response
 *
 *	@example
 *		list(req, res) {
 *			collection.find({}, toRes(res))
 *		}
 */

export function signup(req: Request, res: Response) {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8)
//   }).then(user => {
//     if (req.body.roles) {
//       Role.findAll({
//         where: {
//           name: {
//             [Op.or]: req.body.roles
//           }
//         }
//       }).then(roles => {
//         user.setRoles(roles).then(() => {
//           res.send({ message: "User was registered successfully!" })
//         })
//       })
//     } else {
//       // user role = 1
//       user.setRoles([1]).then(() => {
//         res.send({ message: "User was registered successfully!" })
//       })
//     }
//   }).catch(err => {
//     res.status(500).send({ message: err.message })
//   })
}

export function signin(req: Request, res: Response) {
  // User.findOne({
  //   where: {
  //     email: req.body.email
  //   }
  // }).then(user => {
  //   if (!user) {
  //     return res.status(404).send({ message: "User Not found." })
  //   }

  //   const passwordIsValid = bcrypt.compareSync(
  //     req.body.password,
  //     user.password
  // )

  //   if (!passwordIsValid) {
  //     return res.status(401).send({
  //       accessToken: null,
  //       message: "Invalid Password!"
  //     })
  //   }

  //   const token = jwt.sign(
  //     { id: user.id },
  //     config.secret,
  //     {
  //       algorithm: 'HS256',
  //       allowInsecureKeySizes: true,
  //       expiresIn: 86400, // 24 hours
  //     }
  //   )

  //   const authorities = []

  //   user.getRoles().then(roles => {
  //     for (let i = 0; i < roles.length; i++) {
  //       authorities.push("ROLE_" + roles[i].name.toUpperCase())
  //     }
  //     res.status(200).send({
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //       roles: authorities,
  //       accessToken: token
  //     })
  //   })
  // })
  // .catch(err => {
  //   res.status(500).send({ message: err.message })
  // })
}
