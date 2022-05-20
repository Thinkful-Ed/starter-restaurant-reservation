const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:reservationId").put(controller.update).get(controller.read).all(methodNotAllowed);
router.route("/:reservationId/status").put(controller.updateStatus).all(methodNotAllowed);
router.route("/:reservationId/edit").put(controller.update).all(methodNotAllowed);

module.exports = router;
