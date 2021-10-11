const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//table name must be 2 characters long

//required fields table name capacity

async function list(req, res){
    res.json({data: await tablesService.list()})
}

module.exports = {
    list:[asyncErrorBoundary(list)],
}