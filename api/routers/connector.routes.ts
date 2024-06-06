const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/connector.controller.ts");

const API_URL = "/api/connector/";

module.exports = function(app) {
    app.post(
        API_URL + "create",
        // [verifyToken, isAdmin],
        controller.create
    );
};