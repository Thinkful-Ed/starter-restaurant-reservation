const data = require("./01-reservations-data.json");

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex
		.raw("TRUNCATE TABLE reservations RESTART IDENTITY CASCADE")
		.then(() => knex("reservations").insert(data));
};
