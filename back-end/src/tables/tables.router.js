const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");


router.route("/")
      .post(controller.create)
      .get(controller.list)
      .all(methodNotAllowed);


router.route("/:table_id/seat")
      .put(controller.updateSeat)
      .delete(controller.clearTable)
      .all(methodNotAllowed);

module.exports = router;