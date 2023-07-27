/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://qtgmuonf:GER6zp9YBk1OhltW02MVqchSbMusptIA@trumpet.db.elephantsql.com/qtgmuonf",
  DATABASE_URL_DEVELOPMENT = "postgres://ufygojxu:7QHq2z5Np47mtUdj8d4hDGhgKw1j9EIv@trumpet.db.elephantsql.com/ufygojxu",
  DATABASE_URL_TEST = "postgres://hagocssf:YErEj0kiPWwBsEnYcFMorr0gdHG3YcYe@trumpet.db.elephantsql.com/hagocssf",
  DATABASE_URL_PREVIEW = "postgres://vaedkbjg:HZdxwggHj1y51L3FRNy8jDDPvWfA33Yk@trumpet.db.elephantsql.com/vaedkbjg",
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
