const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./seat.service");

async function list(req, res){
    const { reservation_id } = req.params;
    //if reservation_id is undefined it returns all tables joined with reservations
    const data = await service.list(reservation_id);
    res.json({ data, });
}

module.exports = {
    list : [asyncErrorBoundary(list)],
}