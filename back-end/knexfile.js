/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  // DATABASE_URL = "postgresql://postgres@localhost/postgres",
  // DATABASE_URL_DEVELOPMENT="postgresql://postgres@localhost/postgres",
  // DATABASE_URL_TEST = "postgresql://postgres@localhost/postgres",
  // DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  // DEBUG,

  DATABASE_URL="postgres://mjoeebil:GaNI7FOghjFYipx0XDNACGdCGhVv_COZ@raja.db.elephantsql.com/mjoeebil",
  DATABASE_URL_DEVELOPMENT="postgres://mjoeebil:GaNI7FOghjFYipx0XDNACGdCGhVv_COZ@raja.db.elephantsql.com/mjoeebil",
  DATABASE_URL_TEST="postgres://mjoeebil:GaNI7FOghjFYipx0XDNACGdCGhVv_COZ@raja.db.elephantsql.com/mjoeebil",
  DATABASE_URL_PREVIEW="postgres://mjoeebil:GaNI7FOghjFYipx0XDNACGdCGhVv_COZ@raja.db.elephantsql.com/mjoeebil",
  DEBUG,
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  test: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_TEST,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  preview: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_PREVIEW,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
  production: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },
};
