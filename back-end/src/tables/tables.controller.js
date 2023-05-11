const tablesService = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function list(req, res){
    res.json({ data: await tablesService.list() })
}

async function tableExists(req, res, next){
    const { tableId } = req.params; 
    const table = await tablesService.read(tableId);
    if(table){
        res.locals.table = table;
        return next();
    }
    next({
        status: 404,
        message: `Table ${tableId} cannot be found.`
    })
}

module.exports = {
    list,
}