const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const reservationsRouter = require('./reservations/reservations.router');
const tablesRouter = require('./tables/tables.router');
const cors = require('cors');

const app = express();

// <-- ------Body Parser----- -->
app.use(express.json());

// <-- ------Cors----- -->
app.use(cors());
app.options('*', cors());

// <-- ------ Routes ----- -->
app.use('/reservations', reservationsRouter);
app.use('/tables', tablesRouter);

// <-- ------404 Not Found----- -->
app.use(notFound);

// <-- ------Global Error Handler----- -->
app.use(errorHandler);

module.exports = app;
