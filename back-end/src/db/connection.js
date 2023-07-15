/** @format */
const knex = require("knex")(config);
const environment = process.env.NODE_ENV || "development";
const config = require("../../knexfile")[environment];
if (typeof TextEncoder === "undefined") {
	const { TextEncoder } = require("text-encoding");
	global.TextEncoder = TextEncoder;
}

// Add a cleanup function to close the connection
process.on("SIGINT", () => {
	knex.destroy(() => {
		console.log("Database connection closed.");
		process.exit(0);
	});
});

module.exports = knex;