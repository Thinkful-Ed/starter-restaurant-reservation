const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
      // If query includes date parameter
      // Retrieve reservations for the specified date
      // Respond with the retrieved reservations
    if (req.query.date) {
        const { date } = req.query;
        const reservationsByDate = await service.listByDate(date);
        res.status(200).json({ data: reservationsByDate });
    }
    if (req.query.mobile_number) {
        // If query includes mobile_number parameter
        // Retrieve reservations for the specified mobile number
        // Respond with the retrieved reservations
        const { mobile_number } = req.query;
        const reservationsByNumber = await service.listByNumber(mobile_number);
        res.status(200).json({ data: reservationsByNumber });
    }
}

async function create(req, res) {
    // Create a new reservation using the provided data
    // Respond with the created reservation
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

async function read(req, res) {
    // Extract reservation_id from the request parameters
    // Retrieve reservation details for the specified reservation_id
    // Modify reservation_date and reservation_time for display purposes
    // Respond with the retrieved reservation
    const { reservation_id } = req.params;
    const data = await service.read(reservation_id);
    data.reservation_date = data.reservation_date.toISOString().split('T')[0]
    data.reservation_time = data.reservation_time.slice(0, 5)
    res.status(200).json({ data });
}

async function update(req, res) {
    // Extract reservation_id from the request parameters
    // Extract updatedReservation from the request body
    // Update the reservation with the specified ID using the updated data
    // Respond with the updated reservation
    const { reservation_id } = req.params;
    const updatedReservation = req.body.data;
    const data = await service.update(reservation_id, updatedReservation);
    res.status(200).json({ data });
}


// Define middleware functions for request validation and processing

// Middleware function to validate required properties in request data
const hasRequiredProperties = hasProperties(
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
);

// Middleware function to ensure the number of people is valid
function hasEnoughPeople(req, res, next) {
    // Extract the number of people from the request body
    // Validate that the number of people is a positive number
    // Call next() to proceed to the next middleware if validation passes
    let { people } = req.body.data;
    if (typeof people !== "number" || people < 1) {
        next({
            message: "people has to be a number above zero",
            status: 400,
        });
    }
    next();
}

// Middleware function to ensure the reservation date is in the future
function hasFutureWorkingDate(req, res, next) {
    // Extract reservation_date and reservation_time from the request body
    // Parse the provided date and time into a Date object
    // Compare the reservation date with today's date and perform necessary checks
    // Call next() to proceed to the next middleware if checks pass
    const { reservation_date, reservation_time } = req.body.data;
    const reservationDate = new Date(
        `${reservation_date}T${reservation_time}:00Z`
    );
    res.locals.time = reservationDate;
    const today = new Date();
    if (isNaN(reservationDate.getDate())) {
        next({
            message: `reservation_date / reservation_time incorrect`,
            status: 400,
        });
    }

    if (reservationDate.getUTCDay() == 2) {
        next({
            message: "Restaurant is closed on tuesdays",
            status: 400,
        });
    }

    if (reservationDate < today) {
        next({
            message: "Reservation needs to be in the future",
            status: 400,
        });
    }
    next();
}


// Check if the selected time is within the eligible range (10:30 - 21:30)
function hasEligibleTime(req, res, next) {
    let hours = res.locals.time.getUTCHours();
    let minutes = res.locals.time.getUTCMinutes();
    if (
        hours < 10 ||
        (hours == 10 && minutes < 30) ||
        hours > 21 ||
        (hours == 21 && minutes > 30)
    ) {
        next({
            message: "Please select a time between 10:30 and 21:30",
            status: 400,
        });
    }
    next();
}

// Check if the status provided in the request body is valid
function statusIsBooked(req, res, next) {
    if (
        req.body &&
        req.body.data &&
        (req.body.data.status == "seated" || req.body.data.status == "finished")
    ) {
        next({
            message: `new reservation cant be ${req.body.data.status}`,
            status: 400,
        });
    }
    next();
}

// Check if a reservation with the given ID exists
async function reservationExists(req, res, next) {
    const { reservation_id } = req.params;
    const reservation = await service.read(reservation_id);
    res.locals.reservation = reservation;
    if (!reservation) {
        next({
            message: `this reservation_id (${reservation_id}) does not exist`,
            status: 404,
        });
    }
    next();
}

// Update the status of a reservation
async function changeStatus(req, res, next) {
    const reservation = res.locals.reservation;
    const status = res.locals.status
    const data = await service.changeStatus(reservation.reservation_id, status);
    res.status(200).json({ data });
}


function bodyHasValidStatus(req, res, next) {
    // Extract status from the request body
    // Validate that the status is one of the recognized values
    // Store the valid status in res.locals for later use
    // Call next() to proceed to the next middleware if validation passes
    const { status } = req.body.data;
    res.locals.status = status
    if (!status ||
        !(
            status == "booked" ||
            status == "seated" ||
            status == "finished" ||
            status == "cancelled"
        )
    ) {
        next({
            message: `status is unknown`,
            status: 400,
        });
    }
    next();
}

function reservationIsNotFinished(req, res, next) {
    // Extract reservation from res.locals
    // Check if the reservation status is "finished"
    // If the reservation is finished, respond with an error
    // Otherwise, call next() to proceed to the next middleware
    const reservation = res.locals.reservation;
    if (reservation.status == "finished") {
        next({
            message: `a finished reservation cannot be updated`,
            status: 400,
        });
    }
    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasFutureWorkingDate,
        statusIsBooked,
        hasEligibleTime,
        hasEnoughPeople,
        asyncErrorBoundary(create, 400),
    ],
    read: [
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(read)
    ],
    updateStatus: [
        asyncErrorBoundary(reservationExists),
        reservationIsNotFinished,
        bodyHasValidStatus,
        asyncErrorBoundary(changeStatus),
    ],
    update: [
        asyncErrorBoundary(reservationExists),
        hasRequiredProperties,
        statusIsBooked,
        hasFutureWorkingDate,
        hasEligibleTime,
        hasEnoughPeople,
        asyncErrorBoundary(update),
    ],
};