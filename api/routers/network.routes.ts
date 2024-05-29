const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/networks.controller.ts");


module.exports = function(app) {
    app.post(
        "/api/network/all",
        // [verifyToken, isAdmin],
        controller.all
    );
    app.post(
        "/api/network/all-cascade",
        // [verifyToken, isAdmin],
        controller.allCascade
    );
    app.post(
        "/api/network/create",
        // [verifyToken, isAdmin],
        controller.create
    );
    app.get(
        "/api/network/activate",
        // [verifyToken, isAdmin],
        controller.activate
    );
    app.get(
        "/api/network/deactivate",
        // [verifyToken, isAdmin],
        controller.deactivate
    );
};