const reservationsService = require("../reservations/reservations.service")

function tableUpdate(){
    return async function (req, res, next) {
        const { reservation_id } = req.body.data;

        const validateReservationId = await reservationsService.read(reservation_id);
        
        if(!validateReservationId){
            return next({ status:404, message: `${reservation_id} does not exist`})
        }
        
        res.locals.thisReservation = validateReservationId;
        
        if(res.locals.thisReservation.people > res.locals.foundTable.capacity){
            return next({ status:400, message: `This table has a capacity of ${res.locals.foundTable.capacity}; they party has ${res.locals.thisReservation.people}.`})
        }

        if(res.locals.foundTable.status == 'occupied'){
            return next({ status:400, message: `table is occupied.`})
        }


        next()
    }
}


module.exports = tableUpdate;