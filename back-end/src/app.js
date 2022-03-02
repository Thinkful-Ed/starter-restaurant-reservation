const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Routers
app.use("/reservations", reservationsRouter);
app.use("/tables", reservationsRouter);
app.use("/search", reservationsRouter);
app.use("/dashboard", reservationsRouter);

//Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
