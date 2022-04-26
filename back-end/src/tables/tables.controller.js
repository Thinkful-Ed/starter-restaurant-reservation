const service = require("./tables.service")
const resService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function hasData(req, res, next) {
    if (req.body.data) {
        res.locals.table = req.body.data
        return next()
    }
    const message = "Body must have a data property."
    next({ status: 400, message })
}

async function create(req, res, next) {
    const tableFromRequest = req.body.data
    const newTable = await service.create(req.body.data)
    res.status(201)
        .json({
            data: newTable,
        })
}

function tableNameValid(req, res, next) {
    if (res.locals.table.table_name.length < 2) {
        const message = `Table name must be 2 or more characters.`
        next({ status: 400, message })
    }
    return next()
}

function tableCapacityValid(req, res, next) {
    if (!res.locals.table.capacity) {
        const message = `Capacity must not be blank.`
        next ({ status: 400, message })
    }
    return next()
}

async function reservationExists(req, res, next) {
    const reservation = await resService.read(req.body.data.reservation_id)
    if (!reservation) {
        next({ status: 404, message: `Reservation not found.` })
    }
    res.locals.reservation = reservation
    return next()
}

async function tableExists(req, res, next) {
    const table = await service.read(req.params.table_id)
    if (!table) {
        next({ status: 404, message: `Table not found` })
        return next()
    }
    res.locals.table = table
    return next()
}

async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

async function seatTable(req, res, next) {
    // Check for table capacity
    console.log("res locals reservation", res.locals.reservation)
    console.log("people", res.locals.reservation.reservation_date)
    console.log("capacity:", res.locals.table.capacity)
    if (Number.parseInt(res.locals.table.capacity) < Number.parseInt(res.locals.reservation.people)) {
        next({ status: 400, message: `Table capacity too small to seat reservation.`})
    }
    if (res.locals.table.reservation_id) {
        next({ status: 400, message: `Table is occupied.` })
    }
    const updatedTable = {
        ...res.locals.table,
        reservation_id: req.body.data.reservation_id,
    }
    const data = await service.update(updatedTable)
    res.json({ data })
}

module.exports = {
    create: [
        asyncErrorBoundary(hasData), 
        asyncErrorBoundary(tableNameValid),
        asyncErrorBoundary(tableCapacityValid),
        asyncErrorBoundary(create)
    ],
    seatTable: [
        asyncErrorBoundary(tableExists), 
        asyncErrorBoundary(reservationExists),
        asyncErrorBoundary(seatTable)
    ],
    list,
}