const router = require("express").Router({mergeParams: true})
const reservationsRouter = require("../reservations/reservations.router")
const controller = require("./tables.controller")

router.use("/:reservation_id/seat", reservationsRouter)

router.route("/").get(controller.list)

router.route("/new").post(controller.create)

router.route("/:table_id/seat").put(controller.update).delete(controller.delete)

module.exports = router