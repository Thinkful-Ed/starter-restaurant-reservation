const tablesService = require("./tables.service")
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function listTables(req, res, next) {
    const data = await tablesService.listTables()
    res.json({data})
}
async function create(req, res, next) {
    const data = await tablesService.create(req.body.data)
    res.status(201).json({data})
}

async function tableExists(req, res, next) {
    const tableId = Number(req.params.tableId)
    const foundTable = await tablesService.read(tableId)
    if(foundTable) {
        res.locals.table = foundTable
        next()
    } else {
        next({
            status: 400,
            message: `Table '${tableId}' does not exist`
        })
    }
}

function partyIsSmallerThanCapacity(req, res, next) {
    const {reservation_id} = req.body.data
}

async function updateTable(req, res, next) {
    const updatedTable = {
        ...req.body.data,
        occupied: true,
        table_id: res.locals.table.table_id
    }
    const data = await tablesService.update(updatedTable)
    res.json({data})
}

module.exports = {
    listTables: asyncErrorBoundary(listTables),
    create: asyncErrorBoundary(create),
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(updateTable)]
}