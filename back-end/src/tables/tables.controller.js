const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const propertiesNotEmpty = require("../errors/propertiesNotEmpty");
const numberValidation = require("../errors/numberValidation");
const lengthValidation = require("../errors/lengthValidation");

const service = require("./tables.service");

async function hasReservationId(req,res,next){
    const {reservation_id} = req.body.data;
    const data = await service.readReservation(reservation_id);
    if(data){
      next()
    }else{
      next({status:404, message:`Reservation ${reservation_id} cannot be found.`})
    }
  };

async function tableOccupied(req,res,next){
    const {table_id} = req.params;
    const data = await service.read(table_id);
    if(data.reservation_id){
        next({
            status:400,
            message:`Table ${table_id} is occupied`
        })
    }else{
        next();
    }
};

async function tableNotOccupied(req,res,next){
    const {table_id} = req.params;
    const data = await service.read(table_id);
    if(data.reservation_id){
        next();
    }else{
        next({
            status:400,
            message:`Table ${table_id} is not occupied`
        })
    }
};

async function tableHasCapacity(req,res,next){
    const {table_id} = req.params;
    const {reservation_id} = req.body.data;

    const reservationData = await service.readReservation(reservation_id);
    const tableData = await service.read(table_id);

    if(reservationData.people <= tableData.capacity){
        next()
    }else{
        next({
            status:400,
            message:"capacity is not enough"
        })
    }

}

async function tableExist(req,res,next){
    const {table_id} = req.params;
    const data = await service.read(table_id);
    if(data){
        next()
    }else{
        next({
            status:404,
            message:`Table ${table_id} does not exist.`
        })
    }
}

async function list(req,res,next){
    const data = await service.list();
    res.status(200).json({data:data})
}

async function read(req,res,next){
    const {table_id} = req.params;
    const data = await service.read(table_id);
    res.status(201).json({data:data})
}

async function create(req,res,next){
    const newTable = req.body.data;
    const data = await service.create(newTable)
    res.status(201).json({data:newTable})
}
async function update(req,res,next){

    const {table_id} = req.params;
    const table = await service.read(table_id)
    const {reservation_id} = req.body.data;
    const reservation = await service.readReservation(reservation_id)
    if(reservation.status === 'seated'){
        next({
            status:400,
            message:"reservation already seated"
        })
    }else{

        const updatedReservation = {...reservation,status:'seated'};
        const reservationData = await service.updateReservation(updatedReservation)
        const updatedTable = {...table,reservation_id:reservation_id}
        const data = await service.update(updatedTable);
        res.status(200).json({data:data})
    }
  
    
}

async function destroy(req,res,next){
    const {table_id} = req.params;
    const tableData = await service.read(table_id);
    const {reservation_id} = tableData;
    const reservation = await service.readReservation(reservation_id);
    const updatedReservation = {...reservation,status:'finished'};
    const reservationData = await service.updateReservation(updatedReservation)
    const data = await service.destroy(table_id)
    res.status(200).json({data:data})
}

module.exports = {
    list,
    read:[asyncErrorBoundary(tableExist), asyncErrorBoundary(read)],
    create:[hasProperties('table_name','capacity'),propertiesNotEmpty('table_name'), numberValidation, lengthValidation,create],
    update:[hasProperties('reservation_id'),hasReservationId,tableHasCapacity,tableOccupied,update],
    delete:[asyncErrorBoundary(tableExist),tableNotOccupied,asyncErrorBoundary(destroy)],
}
