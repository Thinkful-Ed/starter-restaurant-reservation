const router = require('express').Router();
const controller = require('./reservations.controller');

// Route for listing reservations
router.route('/')
  .get(controller.list)
  .post(controller.create);

module.exports = router;
