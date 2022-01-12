const router = require("express").Router();
const controller = require("./dashboard.controller");

router.route("/:date").get(controller.list);
router.route("/").get(controller.list);

module.exports = router;