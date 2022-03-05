const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.create)
  .get(controller.list)
  .all(methodNotAllowed);

router.route("/:table_id").get(controller.read).all(methodNotAllowed);

router
  .route("/:table_id/seat")
  .put(controller.addReservation)
  .delete(controller.removeReservation)
  .all(methodNotAllowed);

module.exports = router;
