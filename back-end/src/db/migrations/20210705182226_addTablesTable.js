exports.up = function (knex) {
  return knex.schema.createTable("tables", (table) => {
    table.increments("table_id").primary();
    table.timestamps(true, true);
    table.string("table_name").notNullable();
    table.integer("capacity").unsigned().notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tables");
};
