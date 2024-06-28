import { Request, Response, NextFunction } from 'express'

import jwt from "jsonwebtoken"
import config from "./../config/auth.config.ts"
import db from "./../models/connect.models.ts"
import userModel from "./../models/user.model.ts"


db.user = userModel(db.sequelize, db.Sequelize)

const User = db.user

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  let token = req.headers["x-access-token"]

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    })
  }

  jwt.verify(
    token,
    config.secret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        })
      }
      req.userId = decoded.id
      next()
    }
  )
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
	User.findByPk(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === "admin") {
					next()
					return
				}
			}

			res.status(403).send({
				message: "Require Admin Role!"
			})

			return
		})
	})
}

export function isModerator(req: Request, res: Response, next: NextFunction) {
	User.findByPk(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === "moderator") {
					next()
					return
				}
			}

			res.status(403).send({
				message: "Require Moderator Role!"
			})
		})
	})
}

export function isModeratorOrAdmin(req: Request, res: Response, next: NextFunction) {
	User.findByPk(req.userId).then(user => {
		user.getRoles().then(roles => {
			for (let i = 0; i < roles.length; i++) {
				if (roles[i].name === "moderator") {
					next()
					return
				}

				if (roles[i].name === "admin") {
					next()
					return
				}
			}

			res.status(403).send({
				message: "Require Moderator or Admin Role!"
			})
		})
	})
}
