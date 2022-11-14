const controller = require("./tables.controller");
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:table_id/seat/")
    .put(controller.seat)
    .all(methodNotAllowed);

router.route("/:reservation_date")
    .get(controller.listAvailability)
    .all(methodNotAllowed)

router.route("/")
    .post(controller.create)
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;
