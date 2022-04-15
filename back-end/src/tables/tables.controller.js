const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function listTables(req, res, next) {
    const data = await service.listTables()
    res.json({data})
}

module.exports = {
    listTables: asyncErrorBoundary(listTables)
}