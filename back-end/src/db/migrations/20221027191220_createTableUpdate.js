const { table } = require("../connection");

exports.up = function(knex) {
    return knex.schema.alterTable('reservations', function(t) {
        t.integer('people').alter();       
      });
};

exports.down = function(knex) {
  return knex.schema.alterTable("reservations", function(t) {
    t.string('people').alter();
  })
};
