const { verifySignUp } = require("./../middleware/verifySignUp.ts");
const controller = require("./../controllers/auth.controller.ts");


module.exports = function(app) {
  app.post(
    "/api/auth/signup",
    // [
    //     verifySignUp.checkDuplicateUsernameOrEmail,
    //     verifySignUp.checkRolesExisted
    // ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
};