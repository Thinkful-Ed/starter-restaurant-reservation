const service = require("./seats.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const tablesService = require("../tables/tables.service");
const reservService = require("../reservations/reservations.service");

//Validation Middleware

function reservId(req, res, next){
    const table = req.body.data;
    if(!table){
        return next({
            status: 400,
            message: "Data property required"
        });
    } else if(!table.reservation_id){
        return next({
            status: 400,
            message: "reservation_id required"
        });
    }
    next();
}

function seated(req, res, next){
    const { status } = res.locals.reservation;
    if (status === "seated"){
        return next({
            status: 400,
            message: "Reservation is seated already"
        });
    }
    next();
}

async function reservationExists(req, res, next){
    const { reservation_id } = req.body.data;
    const reservation = await reservService.read(reservation_id);
    if(!reservation){
        return next({
            status: 404,
            message: `Reservation ${reservation_id} does not exist`
        });
    }
    res.locals.reservation = reservation;
    next();
}

async function validTable(req, res, next){
    const { table_id } = req.params;
    const currentTable = await tablesService.read(table_id);
    const reservation = res.locals.reservation;
    if(currentTable.capacity < reservation.people){
        return next({
            status: 400,
            message: "Not enough capacity for current reservation"
        });
    } else if(currentTable.reservation_id){
        return next({
            status: 400,
            message: "Table occupied"
        });
    }
    next();
}

async function unavailableTable(req, res, next){
    const { table_id } = req.params;
    const table = await tablesService.read(table_id);
    if(!table){
        return next({
            status: 404,
            message: `Table ${table_id} not found`
        });
    } else if(!table.reservation_id){
        return next({
            status: 400,
            message: "Table not occupied"
        });
    }
    res.locals.reservation_id = table.reservation_id;
    next();
}

//CRUD functions

async function update(req, res, next){
    const { reservation_id } = req.body.data;
    const { table_id } = req.params;
    const data = await service.update(table_id, reservation_id);
    res.status(200).json({ data });
}

async function finishedRes(req, res, next){
   const { table_id } = req.params;
   const reservation = await reservService.finishedRes(res.locals.reservation_id);
   const table = await service.update(table_id, null);
   res.json({ data: table });
}


module.exports = {
    update: [
        reservId, 
        asyncErrorBoundary(reservationExists),
        seated,
        asyncErrorBoundary(validTable),
        asyncErrorBoundary(update),
    ],
    delete: [
        asyncErrorBoundary(unavailableTable),
        asyncErrorBoundary(finishedRes),
    ],
}

