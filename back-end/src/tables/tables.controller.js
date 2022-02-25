const service = require("./tables.service")
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

async function list(req, res, next) {
    const data = await service.list()
    res.json({ data })
}

module.exports = {
    create: [asyncErrorBoundary(hasData), asyncErrorBoundary(create)],
    list,
}