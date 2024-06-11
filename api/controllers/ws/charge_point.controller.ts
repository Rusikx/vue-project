const WebSocket = require("ws");

exports.restart = (req, res) => {
  const data = req.body;

  try {
    const wsClient = new WebSocket(process.env.VITE_WS_HOST + "?point=" + data.point);
    
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
    const wsClient = new WebSocket(process.env.VITE_WS_HOST + "?point=" + data.point);
    
    wsClient.on('open', () => {
        const response = [2, 'reset-' + data.point, 'Reset']
    
        wsClient.send(JSON.stringify(response));
    });

    res.send(true)
  } catch (err) {
    res.status(500).send({ message: err.message });
  };
}
