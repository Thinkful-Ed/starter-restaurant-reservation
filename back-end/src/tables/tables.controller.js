const service = require("./tables.service");
const asyncErrorBoundry = require("../errors/asyncErrorBoundary");
const { reservationExists } = require("../reservations/reservations.controller");

function hasData(req, res, next){
    if (!req.body.data){
        return next({
            status : 400,
            message : "body is missing",
        });
    }
    next();
}

function hasValidTableName(req, res, next){
    const { table_name } = req.body.data;
    if(!table_name || table_name.trim().length <= 1 ){
        return next({
            status : 400,
            message : "Must have a valid table_name",
        });
    }
    next();
}

function hasValidCapacity(req, res, next){
    const { capacity } = req.body.data;
    if(!capacity || typeof capacity !== "number" || isNaN(capacity) || capacity <=0 ){
        return next({
            status : 400,
            message : "Must have a valid capacity",
        });
    }
    next();
}

async function create(req, res){
    req.log.debug({__filename, methodName:"create"});
    const newTable = req.body.data;
    const data = await service.create(newTable);
    req.log.trace({__filename, methodName:"create", data,});
    res.status(201).json({ data, });
}

async function tableExists(req, res, next){
    const { table_id } = req.params;
    if (!table_id){
        return next({
            status : 400,
            message : `:table_id param is missing in in path: ${req.originalUls}`,
        });
    }
    const found = await service.read(table_id);
    if (found){
        res.locals.table = found;
        return next();
    }
    next({
        status : 404,
        message : `table_id: ${table_id} not found in path: ${req.originalUls}`,
    });
}

function hasSufficientCapacity(req, res, next){
    req.log.debug({fileName:"tables.controller.js", methodName:"hasSufficientCapacity"});
    const { capacity } =  res.locals.table;
    const { people } = res.locals.reservation;
    req.log.trace({fileName:"tables.controller.js", methodName:"hasSufficientCapacity", capacity, people});

    if (people > capacity){
        return next({
            status : 400,
            message : "table does not have sufficent capacity",
        });
    }
    next();
}

function isOccupied(req, res, next){
    const { reservation_id } = res.locals.table;
    if (reservation_id){
        return next({
            status : 400,
            message : "Table is occupied",
        });
    }
    next();
}

async function update(req, res){
    const { reservation_id } = req.body.data;
    const table_id  = Number(req.params.table_id);
    req.log.debug({fileName: "tables.controller.js", methodName: "update",reservation_id,table_id,});
    const data = await service.update(table_id, reservation_id);
    res.json({ data, });
}

async function list(req, res){
    const data = await service.list();
    res.json({ data, });
}

module.exports ={
    create: [hasData, hasValidTableName, hasValidCapacity, asyncErrorBoundry(create)],
    update: [
        hasData, 
        asyncErrorBoundry(reservationExists), 
        asyncErrorBoundry(tableExists),
        hasSufficientCapacity,
        isOccupied,
        asyncErrorBoundry(update)
    ],
    list: [asyncErrorBoundry(list)],
}