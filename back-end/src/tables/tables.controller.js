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
    const table = await service.read(req.params.table_name)
    if (table) {
        res.locals.table = table
        return next()
    }
    next({ status: 404, message: `Table not found` })
    return next()
}

async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

async function seatTable(req, res, next) {
    console.log('res locals table', res.locals.table)
    console.log("req body data res id", req.body.data.reservation_id)
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
        asyncErrorBoundary(create)
    ],
    seatTable: [
        asyncErrorBoundary(reservationExists), 
        asyncErrorBoundary(tableExists), 
        asyncErrorBoundary(seatTable)
    ],
    list,
}