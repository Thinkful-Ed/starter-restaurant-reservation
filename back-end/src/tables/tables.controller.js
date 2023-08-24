const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

async function list(req, res) {
    const { date } = req.query;
    const allTables = await service.list(date);
    res.status(200).json({ data: allTables });
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

//in progress
async function update(req, res) {
    const { tableId } = req.params;
    const data = await service.update(
        tableId,
        req.body.data ? req.body.data.reservation_id : null
    );
    res.status(200).json({ data });
}

function hasProperNameAndCapacity(req, res, next) {
    const { table_name, capacity } = req.body.data;
    if (table_name.length < 2) {
        next({
            message: "table_name needs to be longer than one character",
            status: 400,
        });
    }
    if (typeof capacity !== "number") {
        next({
            message: "capacity needs to be a number",
            status: 400,
        });
    }
    next();
}

function requestHasBody(req, res, next) {
    if (!req.body || !req.body.data || !req.body.data.reservation_id) {
        next({
            message: "request needs a body that has reservation_id",
            status: 400,
        });
    }

    res.locals.reservation = req.body.data
    next();
}

//in progress
async function tableHasEnoughSeats(req, res, next) {
    const { tableId } = req.params;
    const reservation_id = res.locals.reservation.reservation_id

    const table = await service.getTable(tableId);
    res.locals.table = table;

    const capacity = table.capacity;
    const numberOfPeople = await service.getReservation(reservation_id);
    const people = numberOfPeople.people;
    if (people > capacity) {
        next({
            message: "table capacity is not enough",
            status: 400,
        });
    }
    next();
}

async function reservationExists(req, res, next) {
    const { reservation_id } = req.body.data;
    res.locals.reservation_id = reservation_id;
    const reservation = await service.getReservation(reservation_id);
    res.locals.reservation = reservation;
    if (!reservation) {
        next({
            message: `this reservation_id (${reservation_id}) does not exist`,
            status: 404,
        });
    }
    next();
}

function tableIsAvailable(req, res, next) {
    let table = res.locals.table;
    if (table.reservation_id) {
        next({
            message: "this table is occupied",
            status: 400,
        });
    }
    next();
}

async function tableExists(req, res, next) {
    const { tableId } = req.params;
    const table = await service.getTable(tableId);
    res.locals.table = table;
    if (!table) {
        next({
            message: `this table (${tableId}) does not exist`,
            status: 404,
        });
    }
    next();
}

function tableIsOccupied(req, res, next) {
    let table = res.locals.table;
    if (!table.reservation_id) {
        next({
            message: "this table is not occupied",
            status: 400,
        });
    }
    next();
}

async function changeStatus(req, res, next) {
    if (req.method == "DELETE") {
        let table = res.locals.table;
        const { reservation_id } = table;
        const data = await service.changeStatus(reservation_id, "finished");
    } else {
        let reservation_id = res.locals.reservation_id;
        const data = await service.changeStatus(reservation_id, "seated");
    }
    next();
}

function reservationIsBooked(req, res, next) {
    let reservation = res.locals.reservation;
    if (reservation.status !== "booked") {
        next({
            message: "status need to be booked, cannot be seated or finished",
            status: 400,
        });
    }
    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties,
        hasProperNameAndCapacity,
        asyncErrorBoundary(create, 400),
    ],
    update: [
        requestHasBody,
        reservationExists,
        reservationIsBooked,
        asyncErrorBoundary(tableHasEnoughSeats),
        tableIsAvailable,
        asyncErrorBoundary(changeStatus, 400),
        asyncErrorBoundary(update, 400),
    ],
    delete: [
        asyncErrorBoundary(tableExists),
        tableIsOccupied,
        asyncErrorBoundary(changeStatus, 400),
        asyncErrorBoundary(update, 400),
    ],
};