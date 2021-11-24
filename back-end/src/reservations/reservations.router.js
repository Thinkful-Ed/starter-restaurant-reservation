const router = require("express").Router({ mergeParams: true });
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);

router.route("/:reservationId").get(controller.read).all(methodNotAllowed);

module.exports = router;
