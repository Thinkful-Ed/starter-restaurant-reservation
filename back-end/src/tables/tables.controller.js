const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationService = require("../reservations/reservations.service");

async function list(req, res) {
    res.json({
        data: await service.list(),
    })
}

async function create(req, res) {
    const data = await service.create(req.body.data);
    res.status(201).json({data});
}

async function seat(req, res) {
    let table = res.locals.table.table_id;
    let reservation = res.locals.reservation.reservation_id;
    await service.seat(table, reservation)
    await reservationService.updateStatus(reservation, "seated")
    res.status(200).json({});
}

async function destroy(req, res, next) {
    if(!res.locals.table.reservation_id) {
        next({
            status: 400,
            message: "table_id is not occupied"
        })
    }
    await service.clear(res.locals.table.table_id)
    await reservationService.updateStatus(res.locals.table.reservation_id, "finished")
    res.status(200).json({})
}

async function tableExists(req, res, next) {
    const {table} = req.params;
    res.locals.table = await service.read(table);
    if (!res.locals.table) {
        next({
            status: 404,
            message: `Table ${table} does not exist`
        });
    }
    next();
}

async function loadReservation(req, res, next) {
    if (!req.body.data) next({status: 400, message: "data is missing"})
    let reservation = req.body.data.reservation_id;
    if (!reservation) next({status: 400, message: "reservation_id is missing"})
    res.locals.reservation = await reservationService.read(reservation);
    if(!res.locals.reservation) next({status: 404, message: `${reservation} does not exist`});
    if(res.locals.reservation.status === "seated") next({status: 400, message: "reservation is already seated"})
    next();
}

function validateSeating(req, res, next) {
    let errors = [];
    let table = res.locals.table;
    if (table.reservation_id) errors.push("table is occupied")
    if (table.capacity < res.locals.reservation.people) {
        errors.push("That table lacks the capacity")
    }
    if (errors.length) {
        next({
            status: 400,
            message: errors.join(", "),
        })
    }
    next();
}


function validateNewTable(req, res, next) {
    let errors = [];
    const { data } = req.body;
    if (!data) return next({status:400, message: "Data is missing"});

    const requiredFields = [
        "table_name",
        "capacity",
    ]

    requiredFields.forEach(field => {
        if (!Object.keys(data).includes(field)) {
            errors.push(`Table must include a ${field}`);
        }
    })

    if (!data.table_name) errors.push("table_name cannot be empty")
    if (data.table_name && data.table_name.length < 2) {
        errors.push("table_name must be at least 2 characters long");
    }

    if (!Number.isInteger(data.capacity) || data.capacity < 1) errors.push(`capacity must be a number of at least 1`);

    if (errors.length) {
        next({
            status: 400,
            message: errors.join(", "),
        })
    }

    next();
}

module.exports = {
    list: asyncErrorBoundary(list),
    create: [validateNewTable, asyncErrorBoundary(create)],
    seat: [asyncErrorBoundary(tableExists), asyncErrorBoundary(loadReservation), validateSeating, asyncErrorBoundary(seat)],
    delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)] ,
}