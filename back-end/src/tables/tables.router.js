const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.list).post(controller.create);
router.route("/:tableId/seat").put(controller.seatReservation);

module.exports = router;
