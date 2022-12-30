
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("reservations")
  .del()
  .then(() => knex("tables").del());
};
