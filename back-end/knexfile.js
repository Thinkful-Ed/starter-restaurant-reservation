/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://eyqlymhe:bhgMLmwj2SI5qfDk_dX68CITLlZ67IfM@isilo.db.elephantsql.com/eyqlymhe",
  DATABASE_URL_DEVELOPMENT = "postgres://epajfnph:z5saUX3k_aoNCwOYfdHmDIP9kkVewEzF@isilo.db.elephantsql.com/epajfnph",
  DATABASE_URL_TEST = "postgres://vdpnhwyt:4GOnXVwwffBrb2BzspK-SqMeZNgwgO66@isilo.db.elephantsql.com/vdpnhwyt",
  DATABASE_URL_PREVIEW = "postgres://hxzgcbfl:0ER_RE2g3_QxuTuw-ia_BfEvjhZ1ErFk@isilo.db.elephantsql.com/hxzgcbfl",
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