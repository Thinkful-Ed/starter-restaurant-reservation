const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
const knex = require("knex")(config);


if(process.env.NODE_ENV != 'test') {
    knex.migrate.latest([config])
    knex.seed.run([config])
}

module.exports = knex;
