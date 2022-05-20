const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./tables.controller");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:tableId/seat").put(controller.update).delete(controller.delete).all(methodNotAllowed);

module.exports = router;
