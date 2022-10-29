const tableService = require("./tables.service");
const reservationService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const { table } = require("../db/connection");

const VALID_PROPERTIES = ["table_name", "capacity"];
//has valid properties middleware
const hasRequiredProperties = hasProperties(VALID_PROPERTIES);
//property validation middleware
function validateTableName(req, res, next) {
    const {table_name} = req.body.data;
    if (!table_name) {
        return next({
            status: 400,
            message: "table_name is required."
        })
    }
    if (table_name.length < 2) {
        return next({
            status: 400,
            message: "table_name must be more than one character in length."
        })
    }
    next();
}

function validateTableCap(req, res, next) {
    const {capacity} = req.body.data;

    if (capacity < 1 || typeof capacity !== "number") {
        return next ({
            status: 400,
            message: "table capacity must be a number greater than one."
        })
    }
    next();
}

function hasReservationId(req, res, next) {
    const table = req.body.data;
    if (!table.reservation_id) {
        return next({
            status:400,
            message: "reservation_id is required."
        })
    }
    next();
  }


//table exists middleware
function hasDataProp(req, res, next) {
    const table = req.body.data;
    if (!table) {
        return next({
            status: 400,
            message: "data property is required."
        })
    }
    next();
}
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const table = await tableService.read(table_id);
    if (table) {
      res.locals.table = table;
      //
      res.locals.table_id = table_id;
      return next();
    }
    //
    return next({ status: 404, message: `Table ${table_id} does not exist` });
  }

//reservation exists middleware
async function reservationExists(req, res, next) {
    const {reservation_id} = req.body.data;
    const reservation = await reservationService.read(reservation_id);
    if (reservation) {
    res.locals.reservation = reservation;
    res.locals.people = reservation.people;
    return next();
  }
    if (!reservation) {
        next({
            status: 404,
            message: `reservation_id ${reservation_id} does not exist.`
        })
    }
    next();
}
//validate capacity
async function validCapacity(req, res, next) {
    const people = res.locals.people;
    const table = res.locals.table;

    if (table.capacity < people) {
        return next({
            status: 400,
            message: "table does not have sufficient capacity."
        })
    }
    if (table.reservation_id) {
        return next({
            status: 400,
            message: "You've selected an occupied table."
        })
    }
    next();
}

//validate table stataus
async function validateTableStatus(req, res, next) {
    const {status} = res.locals;
    if (status === "seated") {
        return next({
            status: 400,
            message: "You've selected an occupied table."
        });   
    }
    next();
}
//CRUD
async function update(req, res, next) {
    const {table_id} = req.params;
    const {reservation_id} = req.body.data;
    const data = await tableService.update(table_id, reservation_id);
    res.status(200).json({data});
}

async function create(req, res, next) {
    const table = req.body.data;
    const data = await tableService.create(table);
    res.status(201).json({data});
}

async function list(req, res, next) {
    const data = await tableService.list();
    res.json({data});
}

module.exports = {
    update: [hasDataProp, hasReservationId, asyncErrorBoundary(tableExists), asyncErrorBoundary(reservationExists), asyncErrorBoundary(validCapacity), validateTableStatus, asyncErrorBoundary(update)],
    create: [hasRequiredProperties, hasDataProp, validateTableName, validateTableCap, asyncErrorBoundary(create)],
    list: [asyncErrorBoundary(list)]
}