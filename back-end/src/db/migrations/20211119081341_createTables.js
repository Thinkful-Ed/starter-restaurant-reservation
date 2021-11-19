exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.text("table_name").notNullable();
    table.integer("capacity").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("tables");
};
