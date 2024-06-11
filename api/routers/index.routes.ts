const auth = require('./auth.routes.ts');
const user = require('./user.routes.ts');
// const network = require('./network.routes.ts');
const chargePoint = require('./charge_point.routes.ts');
const connector = require('./connector.routes.ts');

module.exports = function(app) {
  // simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });

  auth(app);
  user(app);
  // network(app);
  chargePoint(app);
  connector(app);

  // require('./api/routers/auth.routes.ts')(app);
  // require('./api/routers/user.routes.ts')(app);
  // require('./api/routers/network.routes.ts')(app);
}