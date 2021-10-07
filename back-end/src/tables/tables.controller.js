const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//table name must be 2 characters long

//required fields table name capacity

async function list(req, res){
    const tables = await tablesService.list()
    res.json({data: tables})
}

module.exports = {
    list:[asyncErrorBoundary(list)],
}