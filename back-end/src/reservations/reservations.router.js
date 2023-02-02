/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({ mergeParams: true});
// DO WE NEED MERGEROUTES ON???
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")


// LIST ALL RESERVATIONS FOR 1 DAY
//List all reservations for one date only. (E.g. if the URL is /dashboard?date=2035-12-30 then send a GET to /reservations?date=2035-12-30 to list the reservations for that date). The date is defaulted to today, and the reservations are sorted by time.
//                  /RESERVATIONS
router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);
    
    
    //FORM TO CREATE NEW RESERVATION
    // router.route("/new")
    //     .all(methodNotAllowed);
    
    // router.route("/dashboard")
    
router.route("/:reservation_id")
    .get(controller.read)
    .put(controller.update)
    .all(methodNotAllowed);


router.route("/:reservation_id/status")
    .put(controller.updateStatus)
    .all(methodNotAllowed)


module.exports = router;
