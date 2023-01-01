/**
 * List handler for table resources
 */

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("../tables/tables.services");
const hasProperties = require("../errors/hasProperties");
const reservationService = require("../reservations/reservations.services");

const hasRequiredProperties = hasProperties(
  "table_name",
  "capacity",
);
const VALID_PROPERTIES = [
    "table_name",
    "capacity",
  //"status",
];


//List tables 
async function list(req, res,next){
     const data = await service.list();
     res.json({data});
    }

//Check to see if the property provided exists in the data
function hasOnlyValidProperties(req, res, next) {
    const { data = {} } = req.body;
    if (Object.keys(data).length === 0) {
      return next({
        status: 400,
        message: "data is missing",
      });
    }
    const invalidFields = Object.keys(data).filter(
      (field) => !VALID_PROPERTIES.includes(field)
    );
    if (invalidFields.length) {
      return next({
        status: 400,
        message: `Invalids fields: ${invalidFields.join(", ")}`,
      });
    }
    next();
  }

//Cheeck if the capacity and table name meet requirements
  function validTable(req, res, next) {
    const { data :{table_name, capacity}= {}} = req.body;
    const capacityAsNumber = Number(capacity);
    if (capacityAsNumber < 1) {
        return next({
            status: 400,
            message: "Capacity must be at least 1",
          });
    }
    if (table_name.lenth < 2) {
        return next({
            status: 400,
            message: "Table name must be at least 2 characters",
          });
    }
    next();
}

//Cheeck the capacity and table occupancy
async function validSeating(req, res, next) {
  const { data :{reservation_id, table_id}= {}} = req.body;
  // const {tableId} = req.params;
  const table = await service.read(table_id);
  const reservation = await reservationService.read(reservation_id);
  const tableCapacity = Number(table.capacity); 
  const peopleAsNumber = Number(reservation.people);
  if (peopleAsNumber >tableCapacity) {
      return next({
          status: 400,
          message: "Too many people for this table",
        });
  }
  if (table.status === "Occupied") {
      return next({
          status: 400,
          message: "Table is already occupied",
        });
  }
  next();
}

  //Create tables
async function create (req, res){
    const data = await service.create(req.body.data);
    res.status(201).json({data});
  };

//Update existing table with reservation 
async function update(req, res) {
  const {data: {reservation_id}} = req.body;
  const {tableId} = req.params;
  const status = "Occupied";
  const tableUpdate= {
    reservation_id: reservation_id, 
    status: status
  }
  const data = await service.update(tableId, tableUpdate);  
  res.status(201).json({ data });
  }


module.exports= {
list, 
create:[
    hasRequiredProperties,
hasOnlyValidProperties,
validTable,
asyncErrorBoundary(create)
], 
update: [
  validSeating,
  asyncErrorBoundary(update)
]
}