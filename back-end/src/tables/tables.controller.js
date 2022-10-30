const tablesService = require("./tables.service")
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

// VALIDATION //

function bodyDataHas(propertyName) {
    return function (req, res, next) {
        const { data = {} } = req.body 
        if (data[propertyName]) {
            return next()
        }
        next({
            status: 400,
            message: `Must include a ${propertyName}`,
        })
    }
}

function tableNamePropertyIsValid(req, res, next) {
    const { table_name } = req.body.data
    if (table_name.length > 1) {
        return next()
    } else {
        return next({
            status: 400,
            message: `Invalid field: 'table_name' must be at least two characters long.`,
        })
    }
}

function capacityPropertyIsValid(req, res, next) {
    const { capacity } = req.body.data
    if (typeof capacity === "number" && capacity > 0) {
        return next()
    } else {
        return next({
            status: 400,
            message: `Invalid field: 'capacity' must be at least 1.`,
        })
    }
}

async function tableExists(req, res, next) {
    const tableId = req.params.table_id
    const existingTable = await tablesService.readTable(tableId)
    if (existingTable) {
        res.locals.table = existingTable
        return next()
    } else {
        return next({
            status: 404,
            message: `Table ${tableId} does not exist.`,
        })
    }
}

async function reservationExists(req, res, next) {
    const reservationId = req.body.data.reservation_id
    const existingReservation = await reservationsService.readReservation(
        reservationId
    )
    if (existingReservation) {
        res.locals.reservation = existingReservation
        return next()
    } else {
        return next({
            status: 404,
            message: `Reservation ${reservationId} does not exist.`,
        })
    }
}

function tableHasCapacity(req, res, next) {
    const table = res.locals.table
    const reservation = res.locals.reservation
    if (table.capacity >= reservation.people) {
        return next()
    } else {
        return next({
            status:400,
            message: `This table does not have the capacity for this reservation.`,
        })
    }
}

function tableAvailable(req, res, next) {
    const tableStatus = res.locals.table.status
    if (tableStatus === "free") {
        return next()
    } else {
        return next({
            status: 400,
            message: `This table is occupied.`,
        })
    }
}

function tableOccupied(req, res, next) {
    const tableStatus = res.locals.table.status
    if (tableStatus === "occupied") {
        return next()
    } else {
        return next({
            status: 400,
            message: `This table is not occupied.`,
        })
    }
}

function reservationNotYetSeated(req, res, next) {
    const status = res.locals.reservation.status
    if (status !== "seated") {
        next()
    } else {
        next({
            status: 400,
            message: `Reservation is already seated.`,
        })
    }
}

// REQUEST HANDLERS //

async function createTable(req, res) {
    const newTable = req.body.data
    const responseData = await tablesService.createTable(newTable)
    res.status(201).json({ data: responseData })
}

async function readTable(req, res) {
    const tableId = req.params.table_id
    const responseData = await tablesService.readTable(tableId)
    res.status(200).json({ data: responseData })
}

async function seatTable(req, res, next) {
    const tableId = res.locals.table.table_id
    const reservationId = res.locals.reservation.reservation_id
    const responseData = await tablesService.seatTable(tableId, reservationId)
    res.status(200).json({ data: responseData })
}

async function finishTable(req, res) {
    const tableId = req.params.table_id
    const reservationId = res.locals.table.reservation_id
    const responseData = await tablesService.finishTable(tableId, reservationId)
    res.status(200).json({ data: responseData })
}

async function listTables(req, res) {
    const responseData = await tablesService.listTables()
    res.status(200).json({ data: responseData })
}

// EXPORTS //

module.exports = {
    createTable: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        tableNamePropertyIsValid,
        capacityPropertyIsValid,
        asyncErrorBoundary(createTable),
    ],
    readTable: [asyncErrorBoundary(tableExists), asyncErrorBoundary(readTable)],
    seatTable: [
        bodyDataHas("reservation_id"),
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(reservationExists),
        reservationNotYetSeated,
        tableAvailable,
        tableHasCapacity,
        asyncErrorBoundary(seatTable),
    ],
    finishTable: [
        asyncErrorBoundary(tableExists),
        tableOccupied,
        asyncErrorBoundary(finishTable),
    ],
    listTables: [asyncErrorBoundary(listTables)],
}