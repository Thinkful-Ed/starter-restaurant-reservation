const router = require("express").Router()
const controller = require("./tables.controller")



router.route("/new").get(controller.list).post(controller.create)
router.route("/").get(controller.list).post(controller.create)

module.exports = router