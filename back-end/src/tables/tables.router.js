const router = require("express").Router()
const controller = require("./tables.controller")
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/:table_name/seat")
    .put(controller.seatTable)
    .all(methodNotAllowed)

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed)

module.exports = router

/**
 *  PUT to /tables/:table_id/seat/ in order to save the table assignment. 
 *  The body of the request must be { data: { reservation_id: x } } 
 *  where X is the reservation_id of the reservation being seated. 
 *  The tests do not check the body returned by this request.
*/

/*
    if the table capacity is less than the number of people in the reservation, return 400 with an error message.
    if the table is occupied, return 400 with an error message. 
*/