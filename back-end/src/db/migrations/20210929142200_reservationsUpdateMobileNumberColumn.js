
exports.up = function(knex) {
    return knex.schema.alterTable('reservations', function(t) {
        t.string('mobile_number').alter(); 
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable('reservations', function(t) {
        t.integer('mobile_number').alter(); 
      });
};
