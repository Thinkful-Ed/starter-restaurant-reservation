
exports.up = function(knex) {
  return knex.schema.createTable("tables", (table) => {
      table.string("table_name").primary()
      table.integer("capacity").notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("tables")
};
