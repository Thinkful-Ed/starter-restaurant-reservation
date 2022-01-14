const router = require("express").Router();
const reservationRouter = require("../reservations/reservations.router");

router.use("/:date", reservationRouter);
router.use("/", reservationRouter);

module.exports = router;