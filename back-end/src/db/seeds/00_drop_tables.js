
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("tables").del()
  .then(() => knex("reservations").del());
};
