const { Sequelize } = require("sequelize");
const { Client } = require("pg");
const config = require("./../config/db.config.ts");

// const sequelize = new Sequelize(
//   config.DB,
//   config.USER,
//   config.PASSWORD,
//   {
//     host: config.HOST,
//     dialect: config.dialect
//   }
// );

async function createDatabaseIfNotExists() {
  const client = new Client({
    user: config.USER,
    password: config.PASSWORD,
    host: config.HOST,
    port: config.PORT,
    database: config.DB,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  });

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${config.DB}`);
    console.log("Database created or already exists.");
  } catch (error) {
    console.error("Error creating database:", error);
  } finally {
    await client.end();
  }
}

createDatabaseIfNotExists();

// const sequelize = new Sequelize({
//   dialect: config.dialect,
//   database: DATABASE_NAME,
//   username: config.USER,
//   password: config.PASSWORD,
//   host: config.HOST,
//   port: config.PORT,
// });

// module.exports = sequelize;