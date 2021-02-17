const { PORT = 5000 } = process.env;

const app = require("./app");
const knex = require("./db/connection");

knex.migrate.latest().then(console.log).catch(console.error);

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);
