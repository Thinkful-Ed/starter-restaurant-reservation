const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

// const { PORT = 5001 } = process.env; //ADD BACK

// temp vv

const { PORT = 5001, NODE_ENV = "development" } = process.env;

console.log(`Running in ${NODE_ENV} mode`);
console.log("Database URL:", process.env.DATABASE_URL_DEVELOPMENT); // Adjust based on current mode

// temp ^^

const app = require("./app");
const knex = require("./db/connection");

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

function listener() {
  console.log(`Listening on Port ${PORT}!`);
}
