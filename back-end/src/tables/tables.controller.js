const tableService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req,res){
  res.json({data: await tableService.list()})
}

async function hasOnlyValidProperties(req, res, next){
  console.log("hasOnlyValidProperties")
  const VALID_PROPERTIES = [
    "table_name",
    "capacity",
    "reservation_id"
  ]
  const {data= {}} = req.body;
  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));
  if(invalidFields.length){
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")},`
    });
  }
  next();
}
async function hasRequiredProperties(req, res, next){
  console.log("hasRequiredProperties")
  const hasProperties = ["table_name", "capacity"]
  const {data = {}} = req.body
  errorMessages = []
  try{
    hasProperties.forEach((property) =>{
      console.log("data from client: ", data[property])
      const value = data[property];
      if(!value){
        errorMessages.push(`A '${property}' field is required.`)
      }
      if(property === "table_name" && value){
        if(value.length <= 1){
          console.log("length of value: ", value.length)
          errorMessages.push(`Table name should have at least 2 characters, please update table_name.`)
        }
      }
      if(property === "capacity" && value){
        console.log("this is the value of capacity: ", value, "type of value: ", typeof value, "value length: ", value.length)
        // let valueAsNumber = parseInt(value,10)
        //console.log("this is the value of capacity after parseInt: ", valueAsNumber, "type of value: ", valueAsNumber)
        if(value <= 0){
          errorMessages.push(`The capacity must be greater than 0`)
        }
        if(typeof value !== "number"){
          errorMessages.push(`The capacity must be a number`)
        }
      }
    })
    if(errorMessages.length > 0){
      next({
        status:400,
        message: errorMessages.join('\n')
      })
    }
    next();
  }catch(error){
    next(error)
  }
}

async function create(req, res, next){
  console.log("create: ")
  console.log("req.body.data: ", req.body.data)
  await tableService.create(req.body.data)
  .then((data) => {
    return res.status(201).json({data})
  })
  .catch(next)
}

async function validCapacity(req, res, next) {
  console.log("validCapacity")
  const tableData = await tableService.read(req.params.table_id);
  const reservationData = await tableService.readReservation(
    req.body.data.reservation_id
  );
  // console.log("tableData",tableData);
  // console.log("reservationData",reservationData);
  //table is occupied when it has a reservation id
  if (tableData.capacity < reservationData.people) {
    return next({
      status: 400,
      message: `Too many people, capacity is ${tableData.capacity}`,
    });
  }
  if(tableData.reservation_id){
    return next({
      status:400,
      message:`This table is currently occupied.`
    })
  }

  next();
}

async function update(req,res,next){
  console.log("we in update b****: ")
  console.log("reques body: ", req.body)
  console.log("table_id: ", req.params.table_id)

  const updatedReservationId = req.body.data
  console.log("updatedReservationId",updatedReservationId)

  res.json({ data: await tableService.update(updatedReservationId, req.params.table_id) })
}
async function byeByeOccupiedTable(req,res,next){
  const {table_id} = req.params;
  console.log("table_id: ", table_id)
  const reservationIsThere = await tableService.read(table_id);
  console.log("reservationIsThere", reservationIsThere)
  if(reservationIsThere.reservation_id){
    res.json({data: await tableService.freeUpTable(table_id)})
  }
  return next({
    status:400,
    message:`This table is not occupied.`
  })

}
async function tableIdExists(req,res,next){
  console.log("tableIdExists");
  const tableId = await tableService.read(req.params.table_id)
  console.log("table id is: ", tableId)

  if(tableId){
    return next()
  }
  return next({
    status:404,
    message: `The table id does not exist, ${req.params.table_id}.`
  })
}

async function reservationIdExists(req,res,next){
  console.log("reservationIdExists 1");
  console.log("req.body", req.body)

  if(!req.body.data){
    return next({
      status:400,
      message:`Data is missing!`
    })
  }

  if(!req.body.data.reservation_id){
    return next({
      status:400,
      message:`Reservation id is missing, reservation_id!`
    })
  }
  const reservationId = await tableService.readReservation(req.body.data.reservation_id)
  console.log("reservationIdExists 2");

  if(!reservationId){
    return next({
      status:404,
      message:`Reservation id does not exist ${req.body.data.reservation_id}.`
    })
  }

  if(reservationId){
    console.log("reservationIdExists 3");
    return next()
  }

  console.log("reservationIdExists 4");

}


module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    asyncErrorBoundary(hasOnlyValidProperties),
    asyncErrorBoundary(hasRequiredProperties),
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(reservationIdExists),
    asyncErrorBoundary(validCapacity),
    asyncErrorBoundary(update),
  ],
  byeByeOccupiedTable: [
    asyncErrorBoundary(tableIdExists),
    asyncErrorBoundary(byeByeOccupiedTable)
  ]
};