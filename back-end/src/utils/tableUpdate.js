const reservationsService = require("../reservations/reservations.service")

function tableUpdate() {
    return async function (req, res, next) {
        const { reservation_id } = req.body.data;

        const validateReservationId = await reservationsService.read(reservation_id);
        res.locals.thisReservation = validateReservationId;
        
        switch (true) {
            case !validateReservationId:
                next({status: 404, message: `${reservation_id} does not exist.`})
                break;
            case res.locals.thisReservation.people > res.locals.foundTable.capacity:
                next({ status:400, message: `This table has a capacity of ${res.locals.foundTable.capacity}; the party has a ${res.locals.thisReservation.people}.`})
                break;
            case res.locals.foundTable.status === 'occupied':
                next({ status: 400, message: `table ${res.locals.foundTable.table_name} is occupied.`})
        }





        // if(!validateReservationId){
        //     return next({ status:404, message: `${reservation_id} does not exist`})
        // }
        
    
        
        // if(res.locals.thisReservation.people > res.locals.foundTable.capacity){
        //     return next({ status:400, message: `This table has a capacity of ${res.locals.foundTable.capacity}; they party has ${res.locals.thisReservation.people}.`})
        // }

        // if(res.locals.foundTable.status == 'occupied'){
        //     return next({ status:400, message: `table is occupied.`})
        // }


        next()
    }
}


module.exports = tableUpdate;