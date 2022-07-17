exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("reservation_id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("mobile_number").notNullable();
    table.date("reservation_date").notNullable();
    table.time("reservation_time").notNullable();
    table.integer("people").unsigned().notNullable();
    table.timestamps(true, true);

    // exports.up = function (knex) {
    //   return knex.schema.createTable("suppliers", (table) => {
    //     table.increments("supplier_id").primary(); // Sets supplier_id as the primary key
    //     table.string("supplier_name");
    //     table.string("supplier_address_line_1");
    //     table.string("supplier_address_line_2");
    //     table.string("supplier_city");
    //     table.string("supplier_state");
    //     table.string("supplier_zip");
    //     table.string("supplier_phone");
    //     table.string("supplier_email");
    //     table.text("supplier_notes");
    //     table.string("supplier_type_of_goods");
    //     table.timestamps(true, true); // Adds created_at and updated_at columns
    //   });
    // };
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("reservations");
};
