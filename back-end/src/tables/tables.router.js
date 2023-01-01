/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

const router = require("express").Router({mergeParams:true});
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:tableId/seat").put(controller.update).delete(controller.remove).all(methodNotAllowed);

module.exports = router;
