const { PORT = 5001 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

// run migrations, then run listener
knex.migrate
	.latest()
	.then((migrations) => {
		console.log("migrations", migrations);
		app.listen(PORT, listener);
	})
	.catch((error) => {
		console.error(error);
		knex.destroy();
	});

// define listener
function listener() {
	console.log(`Listening on Port ${PORT}!`);
}
