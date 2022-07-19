const data = require("./00-reservations.json");

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex
    .raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
    .then(() => knex("reservations").insert(data));
};
