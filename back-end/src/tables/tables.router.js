const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.listTables)
  .post(controller.createTable)
  .all(methodNotAllowed);

router.route("/:table_id").get(controller.readTable).all(methodNotAllowed);

router
  .route("/:table_id/seat")
  .put(controller.seatTable)
  .delete(controller.unseatTable)
  .all(methodNotAllowed);

module.exports = router;
