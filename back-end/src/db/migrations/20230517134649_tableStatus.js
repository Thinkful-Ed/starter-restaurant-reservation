
exports.up = function(knex) {
    return knex.schema.alterTable("tables", (table) => {
        table.string("status").defaultTo('Free')
      });
};

exports.down = function(knex) {
    return knex.schema.alterTable("tables", (table) => {
        table.dropColumn("status")
      });
};
