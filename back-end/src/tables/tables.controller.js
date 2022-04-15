const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function listTables(req, res, next) {
    const data = await service.listTables()
    res.json({data})
}
async function create(req, res, next) {
    const data = await service.create(req.body.data)
    res.status(201).json({data})
}

module.exports = {
    listTables: asyncErrorBoundary(listTables),
    create: asyncErrorBoundary(create)
}