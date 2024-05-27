// const db = require("./database.ts");
const users = require("./users.ts");
const networks = require("./networks.ts");

module.exports = () => {
    // db();
    users();
    networks();
};
