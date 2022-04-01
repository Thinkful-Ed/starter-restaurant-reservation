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
    const newTable = await service.create(req.body.data)
    res.status(201)
        .json({
            data: newTable,
        })
}

async function reservationExists(req, res, next) {
    const reservation = await resService.read(req.body.data.reservation_id)
    if (reservation) {
        return next()
    }
    next({ status: 404, message: `Reservation not found.` })
}

async function tableExists(req, res, next) {
    const table = await service.read(req.params.table_id)
    if (table) {
        res.locals.table = table
        return next()
    }
    next({ status: 404, message: `Table not found` })
}

async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

async function seatTable(req, res, next) {
    const updatedTable = {
        reservation_id: req.params.reservation_id,
        ...res.locals.table,
    }
    const response = await service.update(updatedTable)
    res.json({ data })
}

module.exports = {
    create: [
        asyncErrorBoundary(hasData), 
        asyncErrorBoundary(create)
    ],
    seatTable: [
        asyncErrorBoundary(reservationExists), 
        asyncErrorBoundary(tableExists), 
        asyncErrorBoundary(seatTable)
    ],
    list,
}