const authJwt = require("./../middleware/authJwt.ts");
const verifySignUp = require("./../middleware/verifySignUp.ts");

module.exports = {
    authJwt,
    verifySignUp
};