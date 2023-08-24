const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const reservationsController = require("../reservations/reservations.controller");

router
    .route("/:tableId/seat")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

router
    .route("/")
    .get(controller.list)
    .post(controller.create)
    .all(methodNotAllowed);

module.exports = router;