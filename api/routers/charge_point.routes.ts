const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/charge_point.controller.ts");
const controllerOut = require("./../controllers/ws/charge_point.controller.ts");


const API_URL = "/api/charge-point/";

module.exports = function(app) {
  app.post(
    API_URL + "all",
    // [verifyToken, isAdmin],
    controller.all
  );
  app.post(
    API_URL + "all-cascade",
    // [verifyToken, isAdmin],
    controller.allCascade
  );
  app.post(
    API_URL + "create",
    // [verifyToken, isAdmin],
    controller.create
  );
  app.get(
    API_URL + "activate",
    // [verifyToken, isAdmin],
    controller.activate
  );
  app.get(
    API_URL + "deactivate",
    // [verifyToken, isAdmin],
    controller.deactivate
  );

  // For ws
  app.post(
    API_URL + "restart-out",
    // [verifyToken, isAdmin],
    controllerOut.restart
  );
  app.post(
    API_URL + "reset-out",
    // [verifyToken, isAdmin],
    controllerOut.reset
  );
};