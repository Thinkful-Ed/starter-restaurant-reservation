/**
 * Knex configuration file.
 *
 * You will not need to make changes to this file.
 */

require('dotenv').config();
const path = require("path");

const {
  DATABASE_URL = "postgres://bicrzoni:ZumzJt66GSBTWcK0wrOLNWcB2s0qP-4m@castor.db.elephantsql.com/bicrzoni",
  DATABASE_URL_DEVELOPMENT = "postgres://sipoczmf:bjiE0SJxMiR1Uc3pnBlg9uz7nYaOtRAl@castor.db.elephantsql.com/sipoczmf",
  DATABASE_URL_TEST = "postgres://bgjnimze:LxDHxmJthrHQMDppB4o8QWcmWTe-n4OX@castor.db.elephantsql.com/bgjnimze",
  DATABASE_URL_PREVIEW = "postgres://mbwbxoqf:UMKJt281N_9xFlSevRvu5qEKeV5QADLq@castor.db.elephantsql.com/mbwbxoqf",
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
