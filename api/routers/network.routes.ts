const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/networks.controller.ts");


module.exports = function(app) {
    app.post(
        "/api/network/all",
        // [verifyToken, isAdmin],
        controller.all
    );
    app.post(
        "/api/network/create",
        // [verifyToken, isAdmin],
        controller.create
    );
};