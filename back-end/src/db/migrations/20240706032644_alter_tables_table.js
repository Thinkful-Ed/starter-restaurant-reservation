exports.up = function(knex) {
    return knex.schema.alterTable("tables", function(table) {
      // Modify the "capacity" column to be unsigned
      table.integer("capacity").unsigned().alter();
  
      // Make "reservation_id" nullable
      table.integer("reservation_id").nullable().alter();
  
      // Add a new column for "occupied" status
      table.boolean("occupied").notNullable().defaultTo(false);
  
      // Add timestamp columns
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable("tables", function(table) {
      // Revert the "capacity" column changes
      table.integer("capacity").notNullable().alter();
  
      // Change "reservation_id" back to non-nullable and drop foreign
      table.dropColumn("occupied");
      table.dropTimestamps();
    });
  };
  