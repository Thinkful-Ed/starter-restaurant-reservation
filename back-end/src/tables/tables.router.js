/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

const router = require("express").Router({mergeParams:true});
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.rout("/:tableId/seat").put(controller.update).all(methodNotAllowed);

module.exports = router;
