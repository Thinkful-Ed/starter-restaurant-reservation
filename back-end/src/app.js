// Config
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
// External modules
const express = require("express");
const cors = require("cors");
// Internal modules
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");
const tablesRouter = require("./tables/tables.router");
// Define app
const app = express();
// App middleware
app.use(cors());
app.use(express.json());
// Define routes
app.use("/reservations", reservationsRouter);
app.use("/tables", tablesRouter);
// Handle errors
app.use(notFound);
app.use(errorHandler);
// Export
module.exports = app;
