const service = require("./tables.service")

async function list(req, res) {
    const tables = await service.list()
    res.json(tables)
}

const VALID_TABLE = [
    "table_name",
    "capacity",
    "status",
    "reservation_id"
]
function validTable(req, res, next) {
    const newTable = req.body
    if (newTable) {
        const invalidTable = Object.keys(newTable).filter((key)=> !VALID_TABLE.includes(key))
        if (invalidTable.length) {
            return next({
                status: 400,
                message: `invalid table field(s): ${invalidTable.join(", ")}`
            })
        }
        if (newTable.table_name.length < 2) {
            return next({
                status: 400,
                message: `${newTable.table_name} not a valid table name`
            })
        }
        if (newTable.capacity < 1) {
            return next({
                status: 400,
                message: `Invalid table capacity.`
            })
        }
        res.locals.newTable = newTable
        next()
    }
}

async function create(req, res) {
    const {newTable} = res.locals
    const table = await service.create(newTable)
    res.status(201).json({data: table})
}

async function tableExists(req, res, next) {
    const {table_id} = req.params
    const tableNum = Number(table_id)
    console.log(typeof tableNum)
    const table = await service.read(tableNum)
    if (table) {
        res.locals.table = table
        return next()
    }
    next({
        status: 404,
        message: `table ${tableId} not found.`
    })
}

//check if table can fit reservation size
async function tableCap(req, res, next) {
    /**
     * get reservation
     * compare tabale capacity with reservation people
     */
    const newTable = req.body
    const {reservation_id} = newTable
    const resNum = Number(reservation_id)
    console.log("RESERVATION_ID ", reservation_id)
    const reservation = await service.reservation(resNum)
    if (reservation) {
        console.log("newTable.capacity ", typeof newTable.capacity)
        console.log("reservation ", reservation.people)
        const capacity = Number(newTable.capacity)
        const partySize = Number(reservation.people)
        if (capacity >= partySize ) {
            res.locals.newTable = newTable
            res.locals.reservation = reservation
            return next()
        } else {
            return next({
                status: 400,
                message: `Table can't fit reservation.`
            })
        }
    }
    next({
        status: 404,
        message: `reservation ${resNum} not found`
    })
}

//check if table is occupied or not
function occupiedOrFree(req, res, next) {
    const { table } = res.locals
    if (table.status === "Occupied") {
        return next({
            status: 400,
            message: `Table must be free to reserve`
        })
    }
    next()
}

async function update(req, res) {
    const newTable = req.body
    console.log(newTable)
    const changedTable = await service.update(newTable)
    res.status(201).json({data: changedTable})
}

async function destroy(req, res, next) {
    const {table} = res.locals
    const deletingTable = await service.destroy(table)
    res.status(200).json("delete success")
}

module.exports = {
    list,
    create: [
        validTable,
        create
    ],
    update: [
        tableExists,
        tableCap,
        occupiedOrFree,
        update
    ],
    delete: [
        tableExists,
        destroy
    ]
}