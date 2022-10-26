const service = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res){
    const data = await service.list()
    res.status(200).json(data)
}

function read(req, res, next){
    res.status(200).json(res.locals.table)
}

async function isValidId(req, res, next){
    const {table_id} = req.params
    const table = await service.read(table_id)

    if(table){
        res.locals.table = table
        next()
    }
    next({
        status: 404,
        message: `The table ID ${req.params.table_id} is not valid.`
    })
}

module.exports = {
    read: [asyncErrorBoundary(isValidId), read],
    list: [asyncErrorBoundary(list)]
}