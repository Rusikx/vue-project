// const WebSocket = require("ws")
const ChargePointClass = require("./../classes/ChargePointClass.ts")

const chargePointClass = new ChargePointClass()

exports.create = async (req, res) => {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.create(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.all = async (req, res) => {
  try {
    res.send(await chargePointClass.all())
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.allCascade = async (req, res) => {
  try {
    res.send(await chargePointClass.allCascade())
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.activate = async (req, res) => {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.activate(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.deactivate = async (req, res) => {
  const data = req.body[3]
  data.point = req.body.point

  try {
    res.send(await chargePointClass.deactivate(data))
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

exports.heartbeat = async (req, res) => {
  await chargePointClass.heartbeat(req, res)
}
