const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
//const reservRouter = require("../reservations/reservations.router");

//Validation middleware

const requiredProperties = [
    "table_name", 
    "capacity"
];

// async function reservationExists(req, res, next) {
//     const reservation = await service.readReservation(req.body.data.reservation_id);
//     if (reservation) {
//       res.locals.reservation = reservation;
//       return next();
//     }
//     next({
//       status: 404,
//       message: `reservation_id ${req.body.data.reservation_id} does not exist`,
//     })
// }

function hasProperties(req, res, next){
    const {data = {}} = req.body;
    for(let property of requiredProperties){
        if(!data.hasOwnProperty(property)){
            return next({
                status: 400,
                message: `${property} required`
            });
        }
    }
    next();
}

// function validData(req, res, next){
//     if(!req.body.data){
//         return next({
//             status: 400,
//             message: "Data is missing"
//         });
//     }
//     if(!req.body.data.reservation_id){
//         return next({
//             status: 400,
//             message: "reservation_id is missing"
//         });
//     }
//     next();
// }

function validName(req, res, next){
    const { table_name } = req.body.data;
    if(table_name.length < 2){
        next({
            status: 400,
            message: "table_name must be at least 2 characters long."
        });
    }
    next();
}

function validCapacity(req, res, next){
    const { capacity } = req.body.data;
    
    if (typeof capacity != "number"){
        return next({
            status: 400,
            message: "capacity must be a number"
        });
    }
    if (capacity <= 0){
        return next({
            status: 400,
            message: "capacity must be more than 0"
        });
    }
    next();
}

async function tableExists(req, res, next){
const { table_id } = req.params;
const foundTable = await service.read(table_id);
if (foundTable){
    res.locals.table = foundTable;
    next();
} else return next({
    status: 404,
    message: `Table ${table_id} not found`
});
}

// function occupied(req, res, next){
//     const { reservation_id } = res.locals.table;
//     if(!reservation_id){
//         return next({
//             status: 400,
//             message: "Table is not occupied"
//         });
//     }
//     next();
// }

// async function seatsParty(req, res, next){
//     const { capacity } = res.locals.table;
//     const { people } = res.locals.reservation;

//     if (res.locals.table.reservation_id != null){
//         return next({
//             status: 400,
//             message: "Table is occupied"
//         });
//     }
//     if (capacity < people){
//         return next({
//             status: 400,
//             message: `${people} people exceeds this table's capacity.`
//         });
//     }
//     next();
// }

// CRUD function middleware

async function list(req, res){
    const data = await service.list();
    res.json({ data });
}

async function create(req, res){
    const data = await service.create(req.body.data);
    res.status(201).json({ data });
}

async function read(req, res) {
    res.json({
      data: response.locals.table,
    });
  }

// async function update(req, res){
//     const { table_id } = res.locals.table;
//     const { reservation_id } = res.locals.reservation;
//     const updateTable = await service.update(table_id, reservation_id);

//     res.json({ data: updateTable });
// }

// async function destroy(req, res){
//     const { table_id } = res.locals.table;
//     await service.finish(table_id);
//     res.json({ data: "Finished"});
// }


module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasProperties,
        validName,
        validCapacity,
        asyncErrorBoundary(create)
    ],
    read: [
        asyncErrorBoundary(tableExists),
        asyncErrorBoundary(read),
    ],
    tableExists,
    // update: [
    //     validData,
    //     reservationExists,
    //     asyncErrorBoundary(tableExists),
    //     seatsParty,
    //     asyncErrorBoundary(update)
    // ],
    // delete: [
    //     asyncErrorBoundary(tableExists),
    //     occupied,
    //     asyncErrorBoundary(destroy)
    // ]
}
