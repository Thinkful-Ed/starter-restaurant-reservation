const router = require("express").Router()
const controller = require("./dashboard.controller")

router.route("/").get(controller.list)

module.exports = router