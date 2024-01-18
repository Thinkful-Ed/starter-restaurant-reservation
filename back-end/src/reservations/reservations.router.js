const router = require("express").Router({ mergeParams: true });
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

router.route("/")
.get(controller.list)
.post(controller.create)
.all(methodNotAllowed);

router.route("/:reservation_id")
.get(controller.read)
.put(controller.update)
.all(methodNotAllowed);

module.exports = router;
