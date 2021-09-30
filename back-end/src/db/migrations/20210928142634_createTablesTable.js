
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.integer("capacity");
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tables");
};
