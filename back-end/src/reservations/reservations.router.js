/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

// External modules
const router = require("express").Router();
// Internal modules
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
// Define router
router
	.route("/")
	.get(controller.list)
	.post(controller.create)
	.put(controller.update)
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
// Export
module.exports = router;
