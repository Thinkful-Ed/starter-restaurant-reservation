// const path = require("path");

// require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const reservationsRouter = require("./reservations/reservations.router");

const app = express();

app.use(cors());
app.use(express.json());

// let nextId = 1;
// app.post('/reservations', ((req, res) => {
//   const newReservation = req.body.data;

//   newReservation.reservation_id = nextId++

//   res.status(201).json({
//     data: newReservation,
//   });
// }))


app.use("/reservations", reservationsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
