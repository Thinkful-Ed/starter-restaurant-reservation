/**
 * Defines the router for table resources.
 *
 * @format
 * @type {Router}
 */

const router = require("express").Router({ mergeParams: true });
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
	.put(controller.update)
	.delete(controller.delete)
	.all(methodNotAllowed);

module.exports = router;
