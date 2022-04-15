const router = require("express").Router()
const controller = require("./tables.controller")

router.route("/").get(controller.listTables)

module.exports = router