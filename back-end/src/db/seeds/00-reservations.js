const data = require("./00-reservations.json")
exports.seed = function (knex) {
  return knex("reservations").insert(data)
};
