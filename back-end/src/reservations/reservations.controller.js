const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
    if (req.query.date) {
        const { date } = req.query;
        const reservationsByDate = await service.listByDate(date);
        res.status(200).json({ data: reservationsByDate });
    }
    if (req.query.mobile_number) {
        const { mobile_number } = req.query;
        const reservationsByNumber = await service.listByNumber(mobile_number);
        res.status(200).json({ data: reservationsByNumber });
    }
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

async function read(req, res) {
    const { reservation_id } = req.params;
    const data = await service.read(reservation_id);
    data.reservation_date = data.reservation_date.toISOString().split('T')[0]
    data.reservation_time = data.reservation_time.slice(0, 5)
    res.status(200).json({ data });
}

async function update(req, res) {
    const { reservation_id } = req.params;
    const updatedReservation = req.body.data;
    const data = await service.update(reservation_id, updatedReservation);
    res.status(200).json({ data });
}

const hasRequiredProperties = hasProperties(
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people"
);

function hasEnoughPeople(req, res, next) {
    let { people } = req.body.data;
    if (typeof people !== "number" || people < 1) {
        next({
            message: "people has to be a number above zero",
            status: 400,
        });
    }
    next();
}

function hasFutureWorkingDate(req, res, next) {
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

async function changeStatus(req, res, next) {
    const reservation = res.locals.reservation;
    const status = res.locals.status
    const data = await service.changeStatus(reservation.reservation_id, status);
    res.status(200).json({ data });
}

function bodyHasValidStatus(req, res, next) {
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