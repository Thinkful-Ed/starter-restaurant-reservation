/** @format */

const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
if (typeof TextEncoder === "undefined") {
	const { TextEncoder } = require("text-encoding");
	global.TextEncoder = TextEncoder;
}
const knex = require("knex")(config);
module.exports = knex;
