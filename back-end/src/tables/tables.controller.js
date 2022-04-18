const tablesService = require("./tables.service")
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")
const hasProperties = require("../errors/hasProperties")
const hasRequiredUpdateProperties = hasProperties("reservation_id")
const hasRequiredCreateProperties = hasProperties("table_name", "capacity")

async function listTables(req, res, next) {
    const data = await tablesService.listTables()
    res.json({data})
}
async function create(req, res, next) {
    const data = await tablesService.create(req.body.data)
    res.status(201).json({data})
}

function tableNameIsMoreThanOneCharacter(req, res, next) {
    const {table_name} = req.body.data
    if(table_name.length < 2) {
        next({
            status: 400,
            message: `table_name must be atleast 2 characters or longer`
        })
    } else {
        next()
    }
}

function capacityIsANumber(req, res, next) {
    let {capacity} = req.body.data
    capacity = Number(capacity)
    if(!Number.isInteger(capacity)) {
        next({
            status: 400,
            message: 'capacity is not a valid number'
        })
    } else {
        next()
    }
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

async function partyIsSmallerThanCapacity(req, res, next) {
    const {reservation_id} = req.body.data
    const reservationPartySize = await reservationsService.read(reservation_id)
    if(!reservationPartySize) {
        next({
            status: 404,
            message: `Reservation id '${reservation_id}' does not exist`
        })
    }
    if(Number(res.locals.table.capacity) < Number(reservationPartySize.people)) {
        next({
            status: 400,
            message: "Party size cannot be greater than table capacity. Please select another table."
        })
    } else {
        next()
    }
}

function isTableOccupied(req, res, next) {
    if(res.locals.table.occupied) {
        next({
            status: 400,
            message: 'Table is currently occupied, please select another table.'
        })
    } else {
        next()
    } 
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
    create: [hasRequiredCreateProperties, tableNameIsMoreThanOneCharacter, capacityIsANumber, asyncErrorBoundary(create)],
    update: [asyncErrorBoundary(tableExists), hasRequiredUpdateProperties, asyncErrorBoundary(partyIsSmallerThanCapacity), isTableOccupied, asyncErrorBoundary(updateTable)]
}