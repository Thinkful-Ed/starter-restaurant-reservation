const router = require("express").Router({ mergeParams: true });
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

router.route("/")
.get(controller.list)
.all(methodNotAllowed);

router.route("/:table_id")
.get(controller.read)
.all(methodNotAllowed);

module.exports = router;