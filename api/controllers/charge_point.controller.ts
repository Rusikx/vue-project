import { Request, Response, NextFunction } from 'express'

import ChargePointClass from "./../classes/ChargePointClass.ts"

const chargePointClass = new ChargePointClass()

export async function create(req: Request, res: Response) {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.create(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function all(req: Request, res: Response) {
  try {
    res.send(await chargePointClass.all())
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function allCascade(req: Request, res: Response) {
  try {
    res.send(await chargePointClass.allCascade())
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function activate(req: Request, res: Response) {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.activate(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function deactivate(req: Request, res: Response) {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.deactivate(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export async function heartbeat(req: Request, res: Response) {
  await chargePointClass.heartbeat(req, res)
}
