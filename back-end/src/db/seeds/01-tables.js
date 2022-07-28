const data = require("./01-tables.json");

exports.seed = function (knex) {
	// Deletes ALL existing entries
	return knex
		.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
    	.then(() => knex("tables").insert(data))
};