const reservationsService = require("../reservations/reservations.service")

function tableUpdate() {
    return async function (req, res, next) {
        const { reservation_id } = req.body.data;
        const { foundTable } = res.locals;

        const validateReservationId = await reservationsService.read(reservation_id);
        
        res.locals.thisReservation = validateReservationId;
        const { thisReservation } = res.locals;
        
        switch (true) {
            case !validateReservationId:
                next({status: 404, message: `${reservation_id} does not exist.`});
                break;
            case thisReservation.people > foundTable.capacity:
                next({ status:400, message: `This table has a capacity of ${foundTable.capacity}; the party has a ${thisReservation.people}.`});
                break;
            case foundTable.status === 'occupied':
                next({ status: 400, message: `table ${foundTable.table_name} is occupied.`});
        };

        next();
    }
}


module.exports = tableUpdate;