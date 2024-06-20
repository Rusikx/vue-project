const db = require("./../../models/connect.models.ts");
const WebSocket = require("ws");
const url = require("url");

db.charge_point = require("./../../models/charge_points.model.ts")(db.sequelize, db.Sequelize);
const ChargePointClass = require("./../../classes/ChargePointClass.ts")

const ChargePoint = db.charge_point;

const wsServerStart = (() => {
  return new WebSocket.Server({ port: process.env.VITE_SERVER_WS_PORT});
})

const wsClientStart = ((point, command) => {
  return new WebSocket(process.env.VITE_WS_HOST + "?point=" + point + "&command=" + command)
})

const chargePointClass = new ChargePointClass()

exports.restart = (req, res) => {
  const data = req.body;

  try {
    const wsClient = wsClientStart(data.point, "restart");
    
    wsClient.on('open', () => {
        const response = [2, 'restart-' + data.point, 'Restart']
    
        wsClient.send(JSON.stringify(response));
    });

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}

exports.reset = (req, res) => {
  const data = req.body;

  try {
    const wsClient = wsClientStart(data.point, "reset");
    
    wsClient.on('open', () => {
        const response = [2, 'reset-' + data.point, 'Reset']
    
        wsClient.send(JSON.stringify(response));
    });

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}

exports.heartbeat = (req, res) => {
  const data = req.body;

  try {
    const wsServer = wsServerStart()

    wsServer.on('connection', (wsClient, req) => {
      const queryParams = url.parse(req.url, true).query

      wsClient.on('message', async (message) => {
        const params = { ... JSON.parse(message), ...queryParams };
        console.log(params)
  
        // if (data.point === params.point) {
        if (params.point) {
          let response = false;

          switch (queryParams.command) {
            case "data":
              response = await chargePointClass.allCascade()
            break;
            case "heartbeat":
              response = await chargePointClass.activate(params)
            break;
          }

          wsClient.send(JSON.stringify(response));
        }

        // if (queryParams.command === "data") {
        //   const response = await chargePointClass.allCascade()
  
        //   wsClient.send(JSON.stringify(response));
        // }
      })

      wsClient.on('close', async () => {
        // if (queryParams.command === "heartbeat") {
        //   const response = chargePointClass.deactivate(data)
  
        //   wsClient.send(JSON.stringify(response));
        // }
      });
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}

exports.data = (req, res) => {
  try {
    const wsServer = wsServerStart()

    wsServer.on('connection', (wsClient, req) => {
      wsClient.on('message', async () => {
        const response = await chargePointClass.allCascade()

        wsClient.send(JSON.stringify(response));
      })
    })

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}
