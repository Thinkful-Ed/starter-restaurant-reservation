const router = require("express").Router();
const controller = require("./reservations.controller");

router.route("/").get(controller.list).post(controller.create);
router.route('/:reservationId').put(controller.update).get(controller.read)
router.route('/:reservationId/status').put(controller.updateStatus)
router.route('/:reservationId/edit').put(controller.update)

module.exports = router;
