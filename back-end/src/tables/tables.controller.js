const tablesService = require("./tables.service");
const reservationsService =require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const knex = require("../db/connection");
const hasProperties = require("../errors/hasProperties");

const hasRequiredProperties = hasProperties("table_name","capacity");


// const { data: { table_name, capacity } = {} } = req.body;

const VALID_PROPERTIES = ["table_name", "capacity","reservation_id"];

function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    const invalidFields = Objest.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));

    if(invalidFields.length) {
      return next({ status : 400,
                    message: `Invlaid Field(s): ${invlaidFields.join(', ')}`});
    }
  next();
}

function hasValidTableName(req, res, next) {
  const{ table_name } = req.body.data;
    if (table_name.length < 2 ) {
      return next({ status: 400, message: "table_name must be at least 2 characters long" });
    }
    next();
}

function hasValidCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if ( capacity < 1) {
    return next({ status: 400, message: "capacity must be at least 1 person" });
  }
  next();
}

async function tableExists(req, res ,next){
   const { table_id } = req.params;
   const table = await tablesService.read( table_id );
   if (table) {
    res.locals.table = table;
    return next;
   }
   next({ status: 404,
          message: `Table ${table_id} cannot be found.`
        });
}

async function create(req, res, next) {
  console.log( "tables.controller - req.body.data: ", req.body.data);
  const { reservation_id } = req.body.data;
  const data = await tablesService.create(reservation_id);
  res.status(201).json({ data });
}

async function list(req, res) {
  const data = await tablesService.list();
  res.json({ data });
}

async function updateSeat(req, res, next) {

  const { table_id } = req.params;
  const { reservation_id } = req.body.data;
  const table = res.locals.table;
  
  if (!table) {
    return next({ status: 404, message: `Table ${table_id} not found` });
  }

  if(!reservation_id) {
    return next({ status: 400, message:  "reservation_id is missing" })
  }
  
  if (table.reservation_id) {
    return next({ status: 400, message: "Table is already occupied" });
  }
    
  const reservation = await reservationsService.read(reservation_id);

  if (!reservation) {
    return next({ status: 404, 
                  message: `Reservation ${reservation_id} cannot be found` });
  }

  if (reservation.people > table.capacity) {
    return next({ status: 400, 
                  message: "Table capacity is less than the number of people in the reservation" });
  }

  const data = await tablesService.updateSeat(table_id, reservation_id);
  res.status(200).json({ data });

}

function hasValidReservationId(req, res, next) {
  const { reservation_id } = req.body.data;
  if(!reservation_id) {
    return next ({ status:400,
                   message: "reservation_id is missing"})
  }
  next();
}





module.exports = {
  create: [hasOnlyValidProperties, 
           hasRequiredProperties, 
           hasValidTableName, 
           hasValidCapacity, 
           asyncErrorBoundary(create)],
  list: [asyncErrorBoundary(list)],
  updateSeat: [asyncErrorBoundary(tableExists),
               hasValidReservationId, 
               asyncErrorBoundary(updateSeat)],
};
