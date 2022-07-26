/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./reservations.controller");
const tablesController = require("../tables/tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reservationId/seat")
    .put(controller.update)
    .get(controller.read)
    .all(methodNotAllowed);


router.route("/:reservationId")
    .get(controller.read)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;
