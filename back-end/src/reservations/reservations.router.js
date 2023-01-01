/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const router = require("express").Router({mergeParams:true});
const controller = require("./reservations.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
const tableRouter = require("../tables/tables.router");

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed);
router.route("/:reservationId").get(controller.read).put(controller.update).all(methodNotAllowed);
router.use("/:reservationId/seat", controller.reservationExists, tableRouter);

module.exports = router;
