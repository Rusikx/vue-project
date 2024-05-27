require('dotenv').config();

module.exports = {
    HOST: process.env.VITE_DB_HOST,
    USER: process.env.VITE_DB_USER,
    PASSWORD: process.env.VITE_DB_PASSWORD,
    DB: process.env.VITE_DB,
    PORT: process.env.VITE_DB_PORT,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};