const router = require('express').Router();
const controller = require('./reservations.controller');

// Route for listing reservations
router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:reservation_id')
  .get(controller.read)
  .put(controller.update);

router
  .route('/:reservation_id/status')
  .put(controller.updateReservationStatus);


router.route('/search')
  .get(controller.search);

module.exports = router;
