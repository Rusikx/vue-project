const { verifyToken, isModerator, isAdmin } = require("./../middleware/authJwt.ts");
const controller = require("./../controllers/user.controller.ts");


module.exports = function(app) {
  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [verifyToken, isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [verifyToken, isAdmin],
    controller.adminBoard
  );
};