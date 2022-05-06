const tableSeed = require('./01-tables.json')
exports.seed = function(knex) {
  return knex('tables').del()
    .then(function () {
      return knex('tables').insert(tableSeed);
    });
};
