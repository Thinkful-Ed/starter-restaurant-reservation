/**
 * Defines the router for tables resources.
 *
 * @type {Router}
 */

const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/:table_id/seat")
   .put(controller.seat)
   .delete(controller.finish)

router.route("/")
   .get(controller.list)
   .post(controller.create)

module.exports = router;