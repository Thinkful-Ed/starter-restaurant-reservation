
exports.up = function(knex) {
    return knex.schema.alterTable("tables", (table) => {
        table.integer("reservation_id")
        table.foreign("reservation_id").references("reservation_id").inTable("reservations")
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable("tables", (table) => {
        table.dropColumn("reservation_id")
      });
};
