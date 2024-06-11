const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/networks.controller.ts");

const API_URL = "/api/network/";

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
};