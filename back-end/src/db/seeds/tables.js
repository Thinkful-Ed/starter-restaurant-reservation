
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tables').del()
    .then(function () {
      // Inserts seed entries
      return knex('tables').insert([
        {table_id: 1, table_name: 'Bar #1', capacity: 1},
        {table_id: 2, table_name: 'Bar #2', capacity: 1},
        {table_id: 3, table_name: '#1', capacity: 6},
        {table_id: 4, table_name: '#2', capacity: 6},
      ]);
    });
};
