exports.up = function(knex) {
    return knex.schema.createTable('tables', (table) => {
      table.increments('table_id').primary();
      table.string('table_name').notNullable().comment('Name of the table');
      table.integer('capacity').unsigned().notNullable().comment('Capacity of the table');
      table.integer('reservation_id')
        .unsigned()
        .references('reservation_id')
        .inTable('reservations')
        .onDelete('SET NULL')
        .comment('ID of the seated reservation');
      table.boolean('occupied').defaultTo(false).comment('Is the table occupied');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('tables');
  };
  