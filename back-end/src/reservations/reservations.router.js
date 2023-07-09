/**
 * Defines the router for reservation resources.
 *
 * @format
 * @type {Router}
 */

const router = require("express").Router({ mergeParams: true });
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
	.route("/")
	.get(controller.list)
	.post(controller.create)
	.all(methodNotAllowed);
router
	.route("/:reservation_id")
	.get(controller.read)
	.put(controller.update)
	.all(methodNotAllowed);
router
	.route("/:reservation_id/status")
	.put(controller.updateStatus)
	.all(methodNotAllowed);

module.exports = router;
