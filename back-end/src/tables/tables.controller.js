const service = require("./tables.service")

async function list(req, res) {
    const tables = await service.list()
    res.json({data: tables})
}

const VALID_TABLE = [
    "table_name",
    "capacity"
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

module.exports = {
    list,
    create: [
        validTable,
        create
    ]
}