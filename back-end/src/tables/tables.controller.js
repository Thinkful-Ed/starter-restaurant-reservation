const tablesService = require('./tables.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require('../errors/hasProperties');
const reservationController = require('../reservations/reservations.controller');
const { table } = require('../db/connection');

const hasRequiredProperties = hasProperties('table_name', 'capacity');
const hasReservationId = hasProperties('reservation_id')

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

function hasValidName(req, res, next){
    const { table_name } = req.body.data;
    if(table_name.length < 2){
        return next({
            status: 400,
            message: 'Invalid table name',
        });
    }
    next();
}

function hasValidCapacity(req, res, next){
    const { capacity } = req.body.data;
    if(capacity < 1 || isNaN(capacity)){
        return next({
            status: 400, 
            message: `Invalid capacity`,
        });
    }
    next();
}

function hasSufficientCapacity(req, res, next){
    const capacity = res.locals.table.capacity;
    const people = res.locals.reservation.people;
    console.log(`Capacity: ${capacity} People: ${people}`)

    if(capacity < people){
        return next({
            status: 400,
            message: `Table does not have sufficient capacity`
        })
    }
    next();
}

function tableIsFree(req, res, next){
    if(res.locals.table.occupied){
        return next({
            status: 400, 
            message: `Table is occupied.`
        })
    }
    next();
}

function tableIsNotSeated(req, res, next){
    if(res.locals.reservation.status === 'seated'){
        return next({
            status: 400,
            message: `Table is already seated.`
        })
    }
}

function tableIsOccupied(req, res, next){
    if(!res.locals.table.occupied){
        return next({
            status: 400,
            message: `Table is not occupied`
        })
    }
}

async function list(req, res){
    res.json({ data: await tablesService.list() })
}

async function create(req, res){
    const data = await tablesService.create(req.body.data);
    res.status(201).json({ data });
}

async function update(req, res) {
    const { reservation_id } = req.body.data;
    const data = await tablesService.update(
      reservation_id,
      res.locals.table.table_id
    );
    res.status(200).json({ data });
}

module.exports = {
    list,
    create: [
        hasRequiredProperties,
        hasValidName,
        hasValidCapacity,
        asyncErrorBoundary(create)
    ],
    update:[
        asyncErrorBoundary(tableExists),
        hasReservationId,
        reservationController.reservationExists,
        hasSufficientCapacity,
        tableIsNotSeated,
        tableIsFree,
        asyncErrorBoundary(update)
    ]
}