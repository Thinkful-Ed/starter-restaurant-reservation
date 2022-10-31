const service = require("./seats.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Validation Middleware

async function seatExists(req, res, next){
    if(!req.body.data){
        return next({
            status: 400,
            message: "Data missing",
        });
    }

    const table = res.locals.table;
    const { table_id, capacity } = table;
    let { reservation_id } = table;

    if(!req.body.data.reservation_id){
        return next({
            status: 400,
            message: "Missing reservation_id",
        });
    }

    if(reservation_id){
        return next({
            status: 400,
            message: "Table is currently occupied",
        });
    }

    let reservation = await service.read(reservation_id);

    if(!reservation){
        return next({
            status: 400,
            message: `Reservation ${reservation_id} not found`,
        });
    }

    if (capacity < reservation.people){
        return next({
            status: 400,
            message: `Table ${table_id} does not meet seating requirements. Please select a different table.`,
        });
    }
    next();
}

//CRUD functions

async function update(req, res, next){
    const { table } = res.locals;
    const { reservation_id } = req.body.data;
    const { table_id } = req.params;
}


